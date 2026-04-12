import React from 'react';

export interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  onClick?: () => void;
}

export const BookCard = (props: BookCardProps) => {
  const { title, author, coverUrl, onClick } = props;

  return (
    <div
      className="book-card group relative overflow-hidden"  // Added 'group' for hover state, 'relative' for positioning, 'overflow-hidden' to clip the overlay
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Book cover image */}
      <img src={coverUrl} alt={`${title} cover`} className="book-cover w-full h-full object-cover" />

      {/* Hover overlay: positioned at bottom, fades in on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <div className="text-white">
          <h3 className="book-title text-sm font-bold">{title}</h3>
          <p className="book-author text-xs">{author}</p>
        </div>
      </div>
    </div>
  );
};
