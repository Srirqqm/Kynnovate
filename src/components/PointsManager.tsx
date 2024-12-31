import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Props {
  currentPoints: number;
  onUpdatePoints: (newPoints: number) => void;
}

export function PointsManager({ currentPoints, onUpdatePoints }: Props) {
  const [pointsToAdd, setPointsToAdd] = useState<number>(0);

  const handleAddPoints = () => {
    if (pointsToAdd) {
      onUpdatePoints(currentPoints + pointsToAdd);
      setPointsToAdd(0);
    }
  };

  const handleSubtractPoints = () => {
    if (pointsToAdd && currentPoints >= pointsToAdd) {
      onUpdatePoints(currentPoints - pointsToAdd);
      setPointsToAdd(0);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <input
        type="number"
        min="0"
        value={pointsToAdd}
        onChange={(e) => setPointsToAdd(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
        placeholder="Points"
      />
      <button
        onClick={handleAddPoints}
        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        title="Add Points"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={handleSubtractPoints}
        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        disabled={currentPoints < pointsToAdd}
        title="Subtract Points"
      >
        <Minus className="w-4 h-4" />
      </button>
    </div>
  );
}