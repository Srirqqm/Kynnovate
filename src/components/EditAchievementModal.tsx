import React, { useState } from 'react';
import { Achievement } from '../types';
import { X } from 'lucide-react';

interface Props {
  achievement?: Achievement;
  onSave: (achievement: Omit<Achievement, 'id'>) => void;
  onClose: () => void;
}

export function EditAchievementModal({ achievement, onSave, onClose }: Props) {
  const [name, setName] = useState(achievement?.name ?? '');
  const [description, setDescription] = useState(achievement?.description ?? '');
  const [pointsRequired, setPointsRequired] = useState(achievement?.pointsRequired ?? 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      pointsRequired,
      icon: achievement?.icon ?? 'Trophy'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {achievement ? 'Edit Achievement' : 'Add Achievement'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points Required
              </label>
              <input
                type="number"
                min="0"
                value={pointsRequired}
                onChange={(e) => setPointsRequired(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}