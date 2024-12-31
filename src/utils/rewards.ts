import { Reward } from '../types';

export function canRedeemReward(userPoints: number, rewardCost: number): boolean {
  return userPoints >= rewardCost;
}

export function calculateRemainingPoints(userPoints: number, rewardCost: number): number {
  return userPoints - rewardCost;
}