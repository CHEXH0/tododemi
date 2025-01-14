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
    <div 
      key={`${item.type}-${item.src}`} 
      className="relative aspect-square group transform hover:scale-105 transition-all duration-300"
    >
      <img 
        src={item.src} 
        alt={item.alt} 
        className="w-full h-full object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300"
      />
      <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
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
    <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl animate-float" style={{ animationDelay: "0.4s" }}>
      <h3 className="font-semibold mb-4 capitalize text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        {field} Media
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mediaItems.map(renderMediaItem)}
      </div>
    </div>
  );
};