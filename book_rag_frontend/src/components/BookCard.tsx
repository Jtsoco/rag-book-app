import React, { useState } from 'react';

export interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  onClick?: () => void;
}

export const BookCard = (props: BookCardProps) => {
  const { title, author, coverUrl, onClick } = props;
  const [imageError, setImageError] = useState(false);

  const getImageElement = () => {
    if (imageError) {
      return (
        <div className="w-full h-full bg-gray-400 flex items-start justify-center p-4">
          <div className="text-center text-white bg-black p-4 rounded" >
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-xs">{author}</p>
          </div>
        </div>
      );
    } else {
      return (
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="book-cover w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      );
    }
  };

  const getOverlayElement = () => {
    if (imageError) {
      return null;
    } else {
      return (
        <div className="absolute bottom-0 left-0 right-0 max-h-1/3 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
          <div className="text-white">
            <h3 className="book-title text-sm font-bold">{title}</h3>
            <p className="book-author text-xs">{author}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="book-card group relative overflow-hidden aspect-[2/3] h-75 flex-shrink-0"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {getImageElement()}
      {getOverlayElement()}
    </div>
  );
};
