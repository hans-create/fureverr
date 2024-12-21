import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageUploader = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 192,
    height: 192,
  });
  const [showCropper, setShowCropper] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = () => {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div>
      {!showCropper ? (
        <label className="flex flex-col items-center justify-center w-48 h-48 rounded-full cursor-pointer overflow-hidden border-2 border-primary-200 hover:border-primary-400 transition-colors">
          {croppedImage ? (
            <img 
              src={croppedImage} 
              alt="Cropped preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-primary-50/30">
              <svg className="w-8 h-8 mb-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-sm text-gray-600">Upload Photo</p>
              <p className="text-xs text-gray-500">PNG, JPG</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
        </label>
      ) : (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Crop Image</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="max-h-[70vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                aspect={1}
                circularCrop
                minWidth={192}
                minHeight={192}
              >
                <img 
                  ref={imgRef}
                  src={src || ''} 
                  alt="Upload preview"
                  style={{ 
                    maxHeight: '60vh',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center'
                  }}
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button 
                onClick={() => {
                  setScale(1);
                  setShowCropper(false);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const croppedImageUrl = getCroppedImg();
                  if (croppedImageUrl) {
                    setCroppedImage(croppedImageUrl);
                    setScale(1);
                    setShowCropper(false);
                  }
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 