import { User } from '../types';

export function generateUserId(): string {
  return Math.random().toString(36).substr(2, 9);
}