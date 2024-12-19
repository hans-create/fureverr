import React, { useState, useRef, useEffect } from 'react';

interface PetType {
  type: string;
  label: string;
  emoji: string;
}

const ALL_PET_TYPES: PetType[] = [
  // Common Pets
  { type: 'dog', label: 'Dog', emoji: '🐕' },
  { type: 'cat', label: 'Cat', emoji: '🐱' },
  { type: 'bird', label: 'Bird', emoji: '🦜' },
  { type: 'rabbit', label: 'Rabbit', emoji: '🐰' },
  { type: 'hamster', label: 'Hamster', emoji: '🐹' },
  { type: 'fish', label: 'Fish', emoji: '🐠' },
  // More Pets
  { type: 'horse', label: 'Horse', emoji: '🐎' },
  { type: 'guinea-pig', label: 'Guinea Pig', emoji: '🐹' },
  { type: 'ferret', label: 'Ferret', emoji: '🦡' },
  { type: 'turtle', label: 'Turtle', emoji: '🐢' },
  { type: 'lizard', label: 'Lizard', emoji: '🦎' },
  { type: 'snake', label: 'Snake', emoji: '🐍' },
  { type: 'parrot', label: 'Parrot', emoji: '🦜' },
  { type: 'canary', label: 'Canary', emoji: '🐦' },
  { type: 'chicken', label: 'Chicken', emoji: '🐔' },
  { type: 'duck', label: 'Duck', emoji: '🦆' },
  { type: 'goat', label: 'Goat', emoji: '🐐' },
  { type: 'sheep', label: 'Sheep', emoji: '🐑' },
  { type: 'pig', label: 'Pig', emoji: '🐷' },
  { type: 'hedgehog', label: 'Hedgehog', emoji: '🦔' },
  { type: 'mouse', label: 'Mouse', emoji: '🐁' },
  { type: 'rat', label: 'Rat', emoji: '🐀' },
  { type: 'gerbil', label: 'Gerbil', emoji: '🐹' },
  { type: 'chinchilla', label: 'Chinchilla', emoji: '🐭' },
  { type: 'goldfish', label: 'Goldfish', emoji: '🐠' },
  { type: 'betta-fish', label: 'Betta Fish', emoji: '🐟' },
  { type: 'bearded-dragon', label: 'Bearded Dragon', emoji: '🦎' },
  { type: 'gecko', label: 'Gecko', emoji: '🦎' },
  { type: 'iguana', label: 'Iguana', emoji: '🦎' },
  { type: 'chameleon', label: 'Chameleon', emoji: '🦎' },
];

interface Props {
  onSelect: (type: string) => void;
  selectedType?: string | null;
}

export const PetTypeSelector: React.FC<Props> = ({ onSelect, selectedType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTypes = ALL_PET_TYPES.filter(pet =>
    pet.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (type: string) => {
    onSelect(type);
    setIsOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedPet = ALL_PET_TYPES.find(pet => pet.type === selectedType);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left border-2 rounded-xl hover:border-primary-300 focus:outline-none focus:border-primary-500 bg-white"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            {selectedPet ? (
              <>
                <span className="mr-2 text-2xl">{selectedPet.emoji}</span>
                {selectedPet.label}
              </>
            ) : (
              <>
                <span className="mr-2">🐾</span>
                Select Pet Type
              </>
            )}
          </span>
          <span className="text-gray-400">▼</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-lg">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search pet type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredTypes.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {filteredTypes.map((pet) => (
                    <button
                      key={pet.type}
                      type="button"
                      onClick={() => handleSelect(pet.type)}
                      className="flex items-center p-2 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <span className="text-2xl mr-2">{pet.emoji}</span>
                      <span>{pet.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No pet types found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};