import React, { useState } from 'react';
import { MediaUpload } from './MediaUpload';
import type { Memory } from '../../lib/types/memorial';

interface Props {
  onSubmit: (memory: Memory) => void;
}

export const MemoryForm: React.FC<Props> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'text' | 'photo' | 'video'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !title || !description) {
      return;
    }

    const memory: Memory = {
      id: Date.now().toString(),
      date,
      title,
      description,
      type: mediaType,
      photos: mediaUrls
    };

    onSubmit(memory);

    // Reset form
    setDate('');
    setTitle('');
    setDescription('');
    setMediaUrls([]);
    setMediaType('text');
  };

  const handleMediaSelected = (url: string) => {
    setMediaUrls([...mediaUrls, url]);
  };

  const removeMedia = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-xl focus:ring-primary-500 focus:border-primary-500"
          required
        />
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Memory title (e.g., 'First Day Home')"
          className="w-full px-4 py-2 border-2 rounded-xl focus:ring-primary-500 focus:border-primary-500"
          required
        />
        
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setMediaType('text')}
            className={`px-4 py-2 rounded-lg ${
              mediaType === 'text' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => setMediaType('photo')}
            className={`px-4 py-2 rounded-lg ${
              mediaType === 'photo'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Photo
          </button>
          <button
            type="button"
            onClick={() => setMediaType('video')}
            className={`px-4 py-2 rounded-lg ${
              mediaType === 'video'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Video
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share this special memory..."
          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-primary-500 focus:border-primary-500"
          rows={3}
          required
        />

        {mediaType !== 'text' && (
          <div className="space-y-4">
            <MediaUpload
              type={mediaType === 'photo' ? 'photo' : 'video'}
              onMediaSelected={handleMediaSelected}
            />
            
            {mediaUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    {mediaType === 'photo' ? (
                      <img
                        src={url}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={url}
                        className="w-full h-24 object-cover rounded-lg"
                        controls
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
          >
            Add Memory
          </button>
        </div>
      </form>
    </div>
  );
};