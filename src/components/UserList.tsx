import React from 'react';
import { User } from '../types';
import { Users, UserPlus } from 'lucide-react';

interface Props {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  onAddUser: () => void;
}

export function UserList({ users, selectedUserId, onSelectUser, onAddUser }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Active Users</h2>
        </div>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              selectedUserId === user.id
                ? 'bg-purple-100 border-2 border-purple-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3 text-left">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">Level {user.level}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}