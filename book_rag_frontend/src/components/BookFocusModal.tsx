import React, { useState } from 'react';
import { CombinedBookRating } from './bookComponentPieces/bookRating';
export interface BookFocusModalProps {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  enjoymentRating: number;
  literaryRating: number;

  onClose: () => void;
  onMoreInfo: () => void;
}
import { BookTextInfo } from './bookComponentPieces/BookTextInfo';
import { BookImageLarge } from './bookComponentPieces/BookImageLarge';

export const BookFocusModal = (props: BookFocusModalProps) => {

  const { title, author, description, coverUrl, enjoymentRating, literaryRating, onClose, onMoreInfo } = props;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 text-black"
      onClick={onClose}  // Close on backdrop click
    >
      <div
        className="fixed bg-white p-6 rounded-lg max-w-4xl w-full mx-4 flex flex-col md:flex-row gap-6"
        onClick={(e) => e.stopPropagation()}  // Prevent close on modal click
      >
        {/* Close Button */}
        <button
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        {/* Left Side: Cover and Ratings */}
        <div className="flex flex-col items-center md:w-1/3">
          <BookImageLarge url={coverUrl} altText={`${title} cover`} />
          <div className="text-center mt-2">
            <div>
              <CombinedBookRating title="Literary Rating" rating={literaryRating} />
            </div>
                        <div>
              <CombinedBookRating title="Enjoyment Rating" rating={enjoymentRating} />
            </div>
          </div>
        </div>

        {/* Right Side: Title, Author, Description, Button */}
        <div className="md:w-2/3 flex flex-col justify-start">
          <BookTextInfo title={title} author={author} description={description} />
          <button
            className="self-start px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={onMoreInfo}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
