import React from 'react';

interface MediaItem {
  src: string;
  alt: string;
  type: 'drawing' | 'image';
}

interface SubmissionMediaProps {
  field: string;
  media: {
    drawings: string[];
    images: string[];
  };
}

export const SubmissionMedia = ({ field, media }: SubmissionMediaProps) => {
  const renderMediaItem = (item: MediaItem) => (
    <div key={`${item.type}-${item.src}`} className="relative aspect-square">
      <img 
        src={item.src} 
        alt={item.alt} 
        className="w-full h-full object-cover rounded-lg"
      />
      <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {item.type}
      </span>
    </div>
  );

  const mediaItems: MediaItem[] = [
    ...media.drawings.map((drawing) => ({
      src: drawing,
      alt: `Drawing for ${field}`,
      type: 'drawing' as const,
    })),
    ...media.images.map((image) => ({
      src: image,
      alt: `Image for ${field}`,
      type: 'image' as const,
    })),
  ];

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-4 capitalize">{field} Media</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mediaItems.map(renderMediaItem)}
      </div>
    </div>
  );
};