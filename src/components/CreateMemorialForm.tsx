import React, { useState } from 'react';
import { PetTypeSelector } from './ui/PetTypeSelector';
import { PhotoUpload } from './ui/PhotoUpload';
import { DateInput } from './ui/DateInput';
import { MemoryTimeline, type Memory } from './ui/MemoryTimeline';
import { createMemorial } from '../lib/memorials';
import { useAuth } from './auth/AuthContext';

const mainPetTypes = [
  { type: 'dog', label: 'Dog', icon: '🐕' },
  { type: 'cat', label: 'Cat', icon: '🐱' },
  { type: 'bird', label: 'Bird', icon: '🦜' }
];

export const CreateMemorialForm: React.FC = () => {
  const { user } = useAuth();
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [memorialPhoto, setMemorialPhoto] = useState<string | null>(null);
  const [petName, setPetName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passingDate, setPassingDate] = useState('');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePetTypeSelect = (type: string) => {
    setSelectedPetType(type);
  };

  const handlePhotoCropped = (croppedImage: string) => {
    setMemorialPhoto(croppedImage);
  };

  const handleAddMemory = (newMemory: Omit<Memory, 'id'>) => {
    const memory: Memory = {
      ...newMemory,
      id: Date.now().toString()
    };
    setMemories([...memories, memory]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      window.location.href = '/login?redirect=/create-memorial';
      return;
    }

    if (!selectedPetType || !petName || !passingDate || !memorialPhoto) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const memorial = {
        userId: user.uid,
        petName,
        petType: selectedPetType,
        dateOfBirth: birthDate || undefined,
        dateOfPassing: passingDate,
        photos: [memorialPhoto],
        memories,
        isPublic: false
      };

      const { slug } = await createMemorial(memorial);
      // Use client-side navigation
      window.location.href = `/${encodeURIComponent(slug)}`;
    } catch (err: any) {
      setError(err.message || 'Failed to create memorial');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Pet Type Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">Choose Pet Type</label>
        
        {/* Main Pet Types */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {mainPetTypes.map(({ type, label, icon }) => (
            <label key={type} className="relative group">
              <input
                type="radio"
                name="pet-type"
                value={type}
                checked={selectedPetType === type}
                onChange={() => handlePetTypeSelect(type)}
                className="peer sr-only"
              />
              <div className="p-6 text-center border-2 rounded-xl cursor-pointer transition-all peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-primary-300">
                <span className="text-4xl mb-2 block">{icon}</span>
                <span className="font-medium">{label}</span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary-500 rounded-xl pointer-events-none"></div>
            </label>
          ))}
        </div>

        {/* Other Pet Types Dropdown */}
        <PetTypeSelector
          onSelect={handlePetTypeSelect}
          selectedType={selectedPetType}
        />
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

        {/* Photo Upload with Preview */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-2">Upload Photos</label>
          <PhotoUpload onImageCropped={handlePhotoCropped} />
          <p className="mt-2 text-sm text-gray-500 text-center">
            Upload a beautiful photo of your pet. You can crop and adjust it to get the perfect memorial image.
          </p>
        </div>

        {/* Important Dates */}
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

        {/* Memory Timeline */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">Memory Timeline</label>
          <MemoryTimeline
            memories={memories}
            onAddMemory={handleAddMemory}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-12 py-4 bg-primary-600 text-white text-lg font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all"
        >
          {isSubmitting ? 'Creating Memorial...' : 'Create Memorial 🌟'}
        </button>
      </div>
    </form>
  );
};