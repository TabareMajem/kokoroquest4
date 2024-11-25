import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Book, Brain } from 'lucide-react';
import MoodTrendChart from '../components/insights/MoodTrendChart';

// Mock data
const mockMoodData = [
  { date: '2024-03-01', mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 } },
  { date: '2024-03-02', mood: { value: 0.6, dominantEmotion: 'content', confidence: 0.85 } },
  { date: '2024-03-03', mood: { value: 0.9, dominantEmotion: 'excited', confidence: 0.95 } },
  { date: '2024-03-04', mood: { value: 0.7, dominantEmotion: 'happy', confidence: 0.8 } },
  { date: '2024-03-05', mood: { value: 0.85, dominantEmotion: 'joyful', confidence: 0.9 } }
];

const mockAchievements = [
  { id: 1, title: 'Emotion Explorer', icon: Heart, date: '2024-03-10' },
  { id: 2, title: 'Story Master', icon: Book, date: '2024-03-09' },
  { id: 3, title: 'Empathy Star', icon: Star, date: '2024-03-08' }
];

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sarah's Progress
          </h1>
          <p className="text-gray-600">
            Track your child's emotional learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Chart */}
            <MoodTrendChart data={mockMoodData} />

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <achievement.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Progress Overview
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Emotional Awareness</span>
                    <span className="font-medium text-purple-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[85%] bg-purple-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Story Creation</span>
                    <span className="font-medium text-purple-600">70%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[70%] bg-purple-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Empathy Skills</span>
                    <span className="font-medium text-purple-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-[90%] bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
              <div className="space-y-4">
                <button className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Schedule Check-in
                </button>
                <button className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  View Latest Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}