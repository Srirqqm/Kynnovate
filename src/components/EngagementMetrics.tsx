import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface Props {
  points: number;
  level: number;
}

export function EngagementMetrics({ points, level }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Points</h3>
            <p className="text-2xl font-bold text-yellow-500">{points}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Star className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold">Level</h3>
            <p className="text-2xl font-bold text-purple-500">{level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}