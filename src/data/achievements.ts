import { Achievement } from '../types';
import { Trophy, Star, Heart, MessageCircle, Share2, Flame } from 'lucide-react';

export const achievements: Achievement[] = [
  {
    id: 'first-post',
    name: 'First Post',
    description: 'Create your first post',
    icon: Trophy.toString(),
    pointsRequired: 10
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Make 50 comments',
    icon: MessageCircle.toString(),
    pointsRequired: 100
  },
  {
    id: 'trending',
    name: 'Trending',
    description: 'Get 100 likes on a single post',
    icon: Heart.toString(),
    pointsRequired: 200
  },
  {
    id: 'viral',
    name: 'Viral Sensation',
    description: 'Get 50 shares on a single post',
    icon: Share2.toString(),
    pointsRequired: 500
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 30-day activity streak',
    icon: Flame.toString(),
    pointsRequired: 1000
  }
];