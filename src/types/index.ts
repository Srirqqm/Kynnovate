export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  achievements: Achievement[];
  rewardHistory: string[];
  activities: Activity[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired: number;
  unlockedAt?: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  icon: string;
}

export interface Activity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share';
  content: string;
  points: number;
  timestamp: Date;
}