import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  selectedAvatar: string;
  onSelect: (avatarUrl: string) => void;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150',
];

export function AvatarSelector({ selectedAvatar, onSelect }: Props) {
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomAvatar(result);
        onSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomAvatar = () => {
    setCustomAvatar(null);
    onSelect(DEFAULT_AVATARS[0]);
  };

  return (
    <div className="space-y-4">
      {customAvatar ? (
        <div className="relative inline-block">
          <img
            src={customAvatar}
            alt="Custom avatar"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <button
            onClick={clearCustomAvatar}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {DEFAULT_AVATARS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => onSelect(avatar)}
                className={`relative rounded-lg overflow-hidden aspect-square ${
                  selectedAvatar === avatar ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <img
                  src={avatar}
                  alt="Avatar option"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Custom Avatar
            </label>
          </div>
        </>
      )}
    </div>
  );
}