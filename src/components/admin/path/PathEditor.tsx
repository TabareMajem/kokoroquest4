import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text } from 'react-konva';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import type { ThematicPath, Milestone, Position } from '../../../types/thematicPath';

type Props = {
  path?: ThematicPath | null;
  onSave: (pathData: Partial<ThematicPath>) => Promise<void>;
  onCancel: () => void;
};

export default function PathEditor({ path, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: path?.name || '',
    theme: path?.theme || '',
    backgroundImage: path?.backgroundImage || '',
    milestones: path?.milestones || []
  });

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [backgroundImageObj, setBackgroundImageObj] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup function to revoke object URLs
    return () => {
      if (formData.backgroundImage && formData.backgroundImage.startsWith('blob:')) {
        URL.revokeObjectURL(formData.backgroundImage);
      }
    };
  }, [formData.backgroundImage]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, backgroundImage: imageUrl }));

    // Load image to get dimensions
    const img = new window.Image();
    img.onload = () => {
      setStageSize({
        width: img.width,
        height: img.height
      });
      setBackgroundImageObj(img);
    };
    img.src = imageUrl;
  };

  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      position: { x: stageSize.width / 2, y: stageSize.height / 2 },
      activityId: '',
      status: 'locked'
    };

    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  };

  const handleDragEnd = (milestone: Milestone, newPos: Position) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === milestone.id
          ? { ...m, position: newPos }
          : m
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.theme.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save path');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {path ? 'Edit Thematic Path' : 'Create Thematic Path'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Path Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <input
            type="text"
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            required
          />
        </div>
      </div>

      {/* Background Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Canvas Editor */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          style={{ background: '#f3f4f6' }}
        >
          <Layer>
            {/* Background Image */}
            {backgroundImageObj && (
              <KonvaImage
                image={backgroundImageObj}
                width={stageSize.width}
                height={stageSize.height}
              />
            )}

            {/* Milestones */}
            {formData.milestones.map((milestone) => (
              <React.Fragment key={milestone.id}>
                <Circle
                  x={milestone.position.x}
                  y={milestone.position.y}
                  radius={20}
                  fill={milestone === selectedMilestone ? '#8b5cf6' : '#e5e7eb'}
                  stroke={milestone === selectedMilestone ? '#7c3aed' : '#d1d5db'}
                  strokeWidth={2}
                  draggable
                  onClick={() => setSelectedMilestone(milestone)}
                  onDragEnd={(e) => handleDragEnd(milestone, {
                    x: e.target.x(),
                    y: e.target.y()
                  })}
                />
                {milestone.label && (
                  <Text
                    x={milestone.position.x - 50}
                    y={milestone.position.y + 25}
                    width={100}
                    text={milestone.label}
                    align="center"
                    fontSize={12}
                    fill="#4b5563"
                  />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Milestone Controls */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddMilestone}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Milestone
        </button>

        {selectedMilestone && (
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                milestones: prev.milestones.filter(m => m.id !== selectedMilestone.id)
              }));
              setSelectedMilestone(null);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg
              hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Remove Selected
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 
            rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent 
                rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Path
            </>
          )}
        </button>
      </div>
    </form>
  );
}