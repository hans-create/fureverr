import React, { useState, useEffect } from 'react';
import { PetTypeSelector } from '../ui/PetTypeSelector';
import { MemoryTimeline, type Memory } from '../ui/MemoryTimeline';
import { createMemorial } from '../../lib/memorials';
import { useAuth } from '../auth/AuthContext';

export const MemorialDetailsForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<any>(null);
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve initial form data
    const savedData = sessionStorage.getItem('memorialFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      window.location.href = '/create-memorial';
    }
  }, []);

  const handleAddMemory = (newMemory: Omit<Memory, 'id'>) => {
    const memory: Memory = {
      ...newMemory,
      id: Date.now().toString()
    };
    setMemories([...memories, memory]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !formData || !selectedPetType) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const memorial = {
        userId: user.uid,
        petName: formData.petName,
        petType: selectedPetType,
        dateOfBirth: formData.birthDate || undefined,
        dateOfPassing: formData.passingDate,
        photos: [formData.memorialPhoto],
        memories,
        isPublic: false
      };

      const { slug } = await createMemorial(memorial);
      sessionStorage.removeItem('memorialFormData');
      window.location.href = `/${encodeURIComponent(slug)}`;
    } catch (err: any) {
      setError(err.message || 'Failed to create memorial');
      setIsSubmitting(false);
    }
  };

  if (!formData) return null;

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
        <PetTypeSelector
          onSelect={setSelectedPetType}
          selectedType={selectedPetType}
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