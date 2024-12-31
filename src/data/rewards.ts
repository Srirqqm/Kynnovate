import { Reward } from '../types';
import { Gift, Crown, Zap, Shield, Award } from 'lucide-react';

export const rewards: Reward[] = [
  {
    id: 'profile-boost',
    name: 'Profile Boost',
    description: 'Get your profile featured for 24 hours',
    pointsCost: 500,
    icon: Zap.toString()
  },
  {
    id: 'premium-badge',
    name: 'Premium Badge',
    description: 'Exclusive badge for your profile',
    pointsCost: 1000,
    icon: Shield.toString()
  },
  {
    id: 'custom-theme',
    name: 'Custom Theme',
    description: 'Unlock custom profile themes',
    pointsCost: 2000,
    icon: Crown.toString()
  },
  {
    id: 'exclusive-content',
    name: 'Exclusive Content Access',
    description: 'Access to premium content for 1 month',
    pointsCost: 5000,
    icon: Award.toString()
  }
];