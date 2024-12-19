import React, { useState, useRef } from 'react';

interface Props {
  type: 'photo' | 'video';
  onMediaSelected: (mediaUrl: string) => void;
}

export const MediaUpload: React.FC<Props> = ({ type, onMediaSelected }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (type === 'photo' && !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (type === 'video' && !file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onMediaSelected(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'photo' ? 'image/*' : 'video/*'}
        onChange={handleFileChange}
        className="hidden"
        id="media-upload"
      />
      <label
        htmlFor="media-upload"
        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 cursor-pointer transition-colors text-center"
      >
        {previewUrl ? (
          type === 'photo' ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 mx-auto object-contain"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="max-h-48 mx-auto"
            />
          )
        ) : (
          <div className="py-8">
            <span className="text-4xl block mb-2">
              {type === 'photo' ? '📸' : '🎥'}
            </span>
            <span className="text-gray-600">
              Click to upload {type === 'photo' ? 'a photo' : 'a video'}
            </span>
          </div>
        )}
      </label>
    </div>
  );
};