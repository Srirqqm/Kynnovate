import React, { useState } from 'react';
import { Reward } from '../types';
import { Gift, Plus, Edit, Trash } from 'lucide-react';
import { EditRewardModal } from './EditRewardModal';
import { generateId } from '../utils/ids';
import { canRedeemReward } from '../utils/rewards';

interface Props {
  rewards: Reward[];
  userPoints: number;
  onRedeem: (rewardId: string) => void;
  onUpdateRewards?: (rewards: Reward[]) => void;
  redeemedRewards: string[];
  isEditable?: boolean;
}

export function RewardsStore({
  rewards,
  userPoints,
  onRedeem,
  onUpdateRewards,
  redeemedRewards,
  isEditable = false
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | undefined>();

  const handleEdit = (reward: Reward) => {
    setEditingReward(reward);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setEditingReward(undefined);
    setShowEditModal(true);
  };

  const handleDelete = (rewardId: string) => {
    if (!onUpdateRewards) return;
    if (confirm('Are you sure you want to delete this reward?')) {
      onUpdateRewards(rewards.filter(r => r.id !== rewardId));
    }
  };

  const handleSave = (rewardData: Omit<Reward, 'id'>) => {
    if (!onUpdateRewards) return;
    if (editingReward) {
      onUpdateRewards(
        rewards.map(r =>
          r.id === editingReward.id
            ? { ...rewardData, id: r.id }
            : r
        )
      );
    } else {
      onUpdateRewards([
        ...rewards,
        { ...rewardData, id: generateId() }
      ]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Rewards Store</h2>
          <div className="text-yellow-500 font-semibold mt-1">
            Your Points: {userPoints}
          </div>
        </div>
        {isEditable && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <Plus className="w-4 h-4" />
            Add Reward
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => {
          const isRedeemed = redeemedRewards.includes(reward.id);
          const canRedeem = canRedeemReward(userPoints, reward.pointsCost);
          
          return (
            <div
              key={reward.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Gift className="w-6 h-6 text-purple-500" />
                  <h3 className="ml-2 font-semibold">{reward.name}</h3>
                </div>
                {isEditable && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(reward)}
                      className="p-1 text-gray-500 hover:text-purple-500"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(reward.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">
                  {reward.pointsCost} points
                </span>
                <button
                  onClick={() => onRedeem(reward.id)}
                  disabled={isRedeemed || !canRedeem}
                  className={`px-4 py-2 rounded-md ${
                    isRedeemed
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : canRedeem
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isRedeemed ? 'Redeemed' : 'Redeem'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showEditModal && (
        <EditRewardModal
          reward={editingReward}
          onSave={handleSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}