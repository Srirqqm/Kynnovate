import React, { useState } from 'react';
import { EngagementMetrics } from './components/EngagementMetrics';
import { AchievementsList } from './components/AchievementsList';
import { RewardsStore } from './components/RewardsStore';
import { UserList } from './components/UserList';
import { ActivityFeed } from './components/ActivityFeed';
import { AddUserModal } from './components/AddUserModal';
import { PointsManager } from './components/PointsManager';
import { initialUsers } from './data/users';
import { rewards as initialRewards } from './data/rewards';
import { calculateRemainingPoints, canRedeemReward } from './utils/rewards';
import { updateUserLevel } from './utils/points';
import { generateUserId } from './utils/user';
import { User, Reward, Achievement } from './types';

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [rewards, setRewards] = useState(initialRewards);
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const selectedUser = users.find(user => user.id === selectedUserId)!;

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const user = { ...newUser, id: generateUserId() };
    setUsers([...users, user]);
    setSelectedUserId(user.id);
  };

  const handleUpdatePoints = (newPoints: number) => {
    setUsers(users.map(user => {
      if (user.id === selectedUserId) {
        const newLevel = updateUserLevel(newPoints);
        return {
          ...user,
          points: newPoints,
          level: newLevel,
          activities: [
            {
              id: generateUserId(),
              type: 'post',
              content: `Points updated to ${newPoints}`,
              points: newPoints - user.points,
              timestamp: new Date(),
            },
            ...user.activities,
          ],
        };
      }
      return user;
    }));
  };

  const handleUpdateAchievements = (achievements: Achievement[]) => {
    setUsers(users.map(user =>
      user.id === selectedUserId
        ? { ...user, achievements }
        : user
    ));
  };

  const handleUpdateRewards = (newRewards: Reward[]) => {
    setRewards(newRewards);
  };

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (canRedeemReward(selectedUser.points, reward.pointsCost)) {
      setUsers(users.map(user => {
        if (user.id === selectedUserId) {
          const newPoints = calculateRemainingPoints(user.points, reward.pointsCost);
          return {
            ...user,
            points: newPoints,
            level: updateUserLevel(newPoints),
            rewardHistory: [...user.rewardHistory, rewardId],
            activities: [
              {
                id: generateUserId(),
                type: 'post',
                content: `Redeemed reward: ${reward.name}`,
                points: -reward.pointsCost,
                timestamp: new Date(),
              },
              ...user.activities,
            ],
          };
        }
        return user;
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Social Engagement & Rewards
          </h1>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-md ${
              isEditMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white`}
          >
            {isEditMode ? 'Save Changes' : 'Edit Mode'}
          </button>
        </div>
        
        <UserList 
          users={users}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
          onAddUser={() => setShowAddModal(true)}
        />
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <EngagementMetrics 
            points={selectedUser.points} 
            level={selectedUser.level}
          />
          {isEditMode && (
            <PointsManager
              currentPoints={selectedUser.points}
              onUpdatePoints={handleUpdatePoints}
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AchievementsList
            userAchievements={selectedUser.achievements}
            onUpdateAchievements={handleUpdateAchievements}
            isEditable={isEditMode}
          />
          <RewardsStore 
            rewards={rewards}
            userPoints={selectedUser.points} 
            onRedeem={handleRedeemReward}
            onUpdateRewards={isEditMode ? handleUpdateRewards : undefined}
            redeemedRewards={selectedUser.rewardHistory}
            isEditable={isEditMode}
          />
        </div>

        <ActivityFeed activities={selectedUser.activities} />

        {showAddModal && (
          <AddUserModal
            onAdd={handleAddUser}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </div>
    </div>
  );
}