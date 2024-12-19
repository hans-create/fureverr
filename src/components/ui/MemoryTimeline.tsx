import React from 'react';
import { MemoryForm } from './MemoryForm';
import type { Memory } from '../../lib/types/memorial';

interface Props {
  memories: Memory[];
  onAddMemory: (memory: Memory) => void;
}

export const MemoryTimeline: React.FC<Props> = ({ memories, onAddMemory }) => {
  return (
    <div className="space-y-8">
      <MemoryForm onSubmit={onAddMemory} />

      {memories.length > 0 && (
        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="p-6 bg-white rounded-lg shadow-md border-l-4 border-primary-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{memory.title}</h4>
                <span className="text-sm text-gray-500">{memory.date}</span>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{memory.description}</p>
              
              {memory.photos && memory.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {memory.photos.map((url, index) => (
                    memory.type === 'photo' ? (
                      <img
                        key={index}
                        src={url}
                        alt={`Memory ${index + 1}`}
                        className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        key={index}
                        src={url}
                        className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity"
                        controls
                      />
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};