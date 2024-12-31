export function updateUserLevel(points: number): number {
  // Level calculation based on points
  // Every 1000 points = 1 level
  return Math.floor(points / 1000) + 1;
}