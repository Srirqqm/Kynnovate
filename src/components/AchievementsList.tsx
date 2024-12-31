import React, { useState } from 'react';
import { Achievement } from '../types';
import { CheckCircle, Lock, Plus, Edit, Trash } from 'lucide-react';
import { EditAchievementModal } from './EditAchievementModal';
import { generateId } from '../utils/ids';

interface Props {
  userAchievements: Achievement[];
  onUpdateAchievements: (achievements: Achievement[]) => void;
  isEditable?: boolean;
}

export function AchievementsList({ userAchievements, onUpdateAchievements, isEditable = false }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>();

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setEditingAchievement(undefined);
    setShowEditModal(true);
  };

  const handleDelete = (achievementId: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      onUpdateAchievements(userAchievements.filter(a => a.id !== achievementId));
    }
  };

  const handleSave = (achievementData: Omit<Achievement, 'id'>) => {
    if (editingAchievement) {
      onUpdateAchievements(
        userAchievements.map(a =>
          a.id === editingAchievement.id
            ? { ...achievementData, id: a.id }
            : a
        )
      );
    } else {
      onUpdateAchievements([
        ...userAchievements,
        { ...achievementData, id: generateId() }
      ]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Achievements</h2>
        {isEditable && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userAchievements.map((achievement) => {
          const isUnlocked = achievement.unlockedAt != null;
          return (
            <div
              key={achievement.id}
              className={`flex items-center p-4 rounded-lg border ${
                isUnlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex-shrink-0">
                {isUnlocked ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {isUnlocked ? 'Unlocked!' : `${achievement.pointsRequired} points required`}
                </p>
              </div>
              {isEditable && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(achievement)}
                    className="p-1 text-gray-500 hover:text-purple-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="p-1 text-gray-500 hover:text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showEditModal && (
        <EditAchievementModal
          achievement={editingAchievement}
          onSave={handleSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}