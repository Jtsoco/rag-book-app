import React, { useState } from 'react';
import { CombinedBookRating } from './bookComponentPieces/bookRating';
import { FullReviewComment, type FullReviewCommentProps } from './bookComponentPieces/ReviewComment';
export interface BookFocusComponentProps {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  enjoymentRating: number;
  literaryRating: number;
  reviews: FullReviewCommentProps[];

  onMoreInfo: () => void;
}
import { BookTextInfo } from './bookComponentPieces/BookTextInfo';
import { BookImageLarge } from './bookComponentPieces/BookImageLarge';

export const BookFocusComponent = (props: BookFocusComponentProps) => {

  const { title, author, description, coverUrl, enjoymentRating, literaryRating, reviews, onMoreInfo } = props;

  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row gap-0">

      {/* Left: Large Image (60% width) */}
      <div className="flex-1">
        <BookImageLarge url={coverUrl} altText={`${title} cover`} />
      </div>

      {/* Right: Info and Reviews (40% width) */}
      <div className="w-full md:w-2/5 p-6 flex flex-col overflow-y-auto">

        {/* Top: Book Info */}
        <div className="flex-shrink-0">
          <BookTextInfo title={title} author={author} description={description} />

          <div className="flex gap-4 mt-4 mb-4">
            <CombinedBookRating title="Literary" rating={literaryRating} />
            <CombinedBookRating title="Enjoyment" rating={enjoymentRating} />
          </div>

          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={onMoreInfo}
          >
            More Info
          </button>
        </div>

        {/* Bottom: Reviews */}
      </div>
        <div className="mt-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <FullReviewComment key={index} {...review} />
            ))}
          </div>
        </div>
    </div>
  );
}
