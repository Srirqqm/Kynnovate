import React from 'react';
import { Activity } from '../types';
import { MessageSquare, Share2, Heart, Send } from 'lucide-react';

interface Props {
  activities: Activity[];
}

const activityIcons = {
  post: Send,
  comment: MessageSquare,
  like: Heart,
  share: Share2,
};

export function ActivityFeed({ activities }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
            >
              <div className="p-2 bg-purple-100 rounded-full">
                <Icon className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-800">{activity.content}</p>
                <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                  <span>+{activity.points} points</span>
                  <span>•</span>
                  <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}