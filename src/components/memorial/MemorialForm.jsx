import { useState } from 'react';

export const MemorialForm = () => {
  const [formData, setFormData] = useState({
    petName: '',
    birthDate: '',
    deathDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Pet's Name</label>
        <input
          type="text"
          value={formData.petName}
          onChange={(e) => setFormData({...formData, petName: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Rainbow Bridge Date</label>
          <input
            type="date"
            value={formData.deathDate}
            onChange={(e) => setFormData({...formData, deathDate: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>
    </form>
  );
}; 