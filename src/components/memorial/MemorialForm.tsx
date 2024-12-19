import React, { useState } from 'react';
import { PhotoUpload } from '../ui/PhotoUpload';
import { DateInput } from '../ui/DateInput';
import { PetTypeSelector } from '../ui/PetTypeSelector';
import { MemoryTimeline } from '../ui/MemoryTimeline';
import { createMemorial } from '../../lib/memorials';
import type { Memory } from '../../lib/types/memorial';

export const MemorialForm: React.FC = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passingDate, setPassingDate] = useState('');
  const [memorialPhoto, setMemorialPhoto] = useState<string | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMemory = (newMemory: Memory) => {
    if (!petName || !petType || !passingDate || !memorialPhoto) {
      setError('Please fill in all required fields above before adding memories');
      return;
    }

    setError(null);
    const updatedMemories = [...memories, newMemory];
    setMemories(updatedMemories);
    
    // Create memorial page after first memory is added
    if (updatedMemories.length === 1) {
      createMemorialPage(updatedMemories);
    }
  };

  const createMemorialPage = async (currentMemories: Memory[]) => {
    setIsSubmitting(true);
    setError(null);
    
    if (!petName || !petType || !passingDate || !memorialPhoto) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const memorial = {
        petName,
        petType,
        dateOfBirth: birthDate || undefined,
        dateOfPassing: passingDate,
        photos: memorialPhoto ? [memorialPhoto] : [],
        memories: currentMemories,
        isPublic: false,
        createdAt: new Date()
      };

      const { slug } = await createMemorial(memorial);
      // Use client-side navigation with a small delay to ensure data is saved
      setTimeout(() => {
        window.location.href = `/${slug}`;
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Failed to create memorial');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Pet Photo */}
      <div className="text-center">
        <PhotoUpload onImageCropped={setMemorialPhoto} />
        <p className="mt-4 text-sm text-gray-500">
          Upload a beautiful photo of your pet. You can crop and adjust it to get the perfect memorial image.
        </p>
      </div>

      {/* Pet Details */}
      <div className="space-y-6">
        <div>
          <label htmlFor="pet-name" className="block text-lg font-medium text-gray-900 mb-2">
            Pet's Name
          </label>
          <input
            type="text"
            id="pet-name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-primary-500 focus:border-primary-500"
            placeholder="What's your friend's name?"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900 mb-2">
            Pet Type
          </label>
          <PetTypeSelector onSelect={setPetType} selectedType={petType} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateInput
            id="birth-date"
            label="Birth Date (if known)"
            value={birthDate}
            onChange={setBirthDate}
          />
          
          <DateInput
            id="passing-date"
            label="Date of Passing"
            value={passingDate}
            onChange={setPassingDate}
            required
          />
        </div>
      </div>

      {/* Memory Timeline */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-4">Add Your First Memory</label>
        <p className="text-gray-600 mb-4">
          Share a special memory of your beloved pet. Adding your first memory will create your memorial page.
        </p>
        <MemoryTimeline
          memories={memories}
          onAddMemory={handleAddMemory}
        />
      </div>
    </div>
  );
};