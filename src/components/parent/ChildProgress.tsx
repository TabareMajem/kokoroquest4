import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Lock } from 'lucide-react';
import type { ChildMilestone } from './types';

type Props = {
  milestones: ChildMilestone[];
  currentMilestone: ChildMilestone;
};

export default function ChildProgress({ milestones, currentMilestone }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Clock className="w-5 h-5 text-purple-500" />;
      default:
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Milestone */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl 
        shadow-lg p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">
              Currently Working On
            </h2>
            <h3 className="text-2xl font-bold mb-2">
              {currentMilestone.title}
            </h3>
            <p className="text-purple-100 mb-4">
              {currentMilestone.description}
            </p>
            {currentMilestone.progress && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">
                    {currentMilestone.progress}%
                  </span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMilestone.progress}%` }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Learning Journey
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-purple-100" />

          {/* Milestones */}
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="relative flex items-start gap-4 pl-2"
              >
                <div className={`w-10 h-10 rounded-full flex items-center 
                  justify-center z-10 ${
                    milestone.status === 'completed'
                      ? 'bg-green-100'
                      : milestone.status === 'current'
                        ? 'bg-purple-100'
                        : 'bg-gray-100'
                  }`}
                >
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {milestone.description}
                  </p>
                  {milestone.completedAt && (
                    <p className="text-sm text-green-600 mt-1">
                      Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                    </p>
                  )}
                  {milestone.startedAt && milestone.status === 'current' && (
                    <p className="text-sm text-purple-600 mt-1">
                      Started on {new Date(milestone.startedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}