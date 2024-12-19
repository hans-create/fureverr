import React, { useState } from 'react';
import { PhotoUpload } from '../ui/PhotoUpload';
import { DateInput } from '../ui/DateInput';
import { useAuth } from '../auth/AuthContext';

export const InitialMemorialForm: React.FC = () => {
  const { user } = useAuth();
  const [petName, setPetName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passingDate, setPassingDate] = useState('');
  const [memorialPhoto, setMemorialPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!petName || !passingDate || !memorialPhoto) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const slug = encodeURIComponent(petName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      window.location.href = `/${slug}`;
    } catch (err: any) {
      setError(err.message || 'Failed to create memorial page');
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

      {/* Pet Photo */}
      <div className="text-center">
        <PhotoUpload onImageCropped={setMemorialPhoto} />
        <p className="mt-4 text-sm text-gray-500">
          Upload a beautiful photo of your pet. You can crop and adjust it to get the perfect memorial image.
        </p>
      </div>

      {/* Pet Name */}
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

      {/* Submit Button */}
      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-12 py-4 bg-primary-600 text-white text-lg font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all"
        >
          {isSubmitting ? 'Creating Memorial Page...' : 'Create Memorial Page 🌟'}
        </button>
      </div>
    </form>
  );
};