import { User } from '../types';

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    points: 1200,
    level: 2,
    achievements: [],
    rewardHistory: [],
    activities: [
      {
        id: '1',
        type: 'post',
        content: 'Just completed my first project! 🎉',
        points: 50,
        timestamp: new Date('2024-03-10T10:00:00'),
      },
      {
        id: '2',
        type: 'share',
        content: 'Great article about web development',
        points: 30,
        timestamp: new Date('2024-03-11T15:30:00'),
      },
    ],
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    points: 800,
    level: 1,
    achievements: [],
    rewardHistory: [],
    activities: [
      {
        id: '3',
        type: 'comment',
        content: 'This is really helpful, thanks for sharing!',
        points: 20,
        timestamp: new Date('2024-03-11T11:00:00'),
      },
    ],
  },
];