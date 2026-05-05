import { CombinedBookRating } from "./bookComponentPieces/bookRating";
import { FullReviewComment, type FullReviewCommentProps } from "./bookComponentPieces/ReviewComment";
import { BookTextInfo } from "./bookComponentPieces/BookTextInfo";
import { BookImageLarge } from "./bookComponentPieces/BookImageLarge";

export interface BookPageProps {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  enjoymentRating: number;
  literaryRating: number;
  reviews: FullReviewCommentProps[];

  onMoreInfo: () => void;
}

export const BookPage = (props: BookPageProps) => {

  const { title, author, description, coverUrl, enjoymentRating, literaryRating, reviews, onMoreInfo } = props;

 return (
  // book image far left, stars beneath
  // description to the right of the image, with title and author above it
  // reviews below the description, scrollable down below, showing only the first 3 reviews for now, and a "see all reviews" button that will open a modal with all the reviews

    <div className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row gap-0 ">
      {/* Left: Large Image (60% width) */}
      <div className=" h-[80vh]">
        <BookImageLarge url={coverUrl} altText={`${title} cover`} />
          <div className="flex gap-4 mt-4 mb-4">
            <CombinedBookRating title="Literary" rating={literaryRating} />
            <CombinedBookRating title="Enjoyment" rating={enjoymentRating} />
          </div>
      </div>

      {/* Right: Info and Reviews (40% width) */}
      <div className=" p-6 flex flex-col overflow-y-auto">

        {/* Top: Book Info */}
        <div className="flex-shrink-0">
          <BookTextInfo title={title} author={author} description={description} />


          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={onMoreInfo}
          >
            More Info
          </button>
        </div>

        {/* Bottom: Reviews */}
        <div className="mt-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="space-y-3">
            {reviews.slice(0, 3).map((review, index) => (
              <FullReviewComment key={index} {...review} />
            ))}
          </div>
          {reviews.length > 3 && (
            <button
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              onClick={() => alert('Show all reviews in a modal')}
            >
              See All Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
