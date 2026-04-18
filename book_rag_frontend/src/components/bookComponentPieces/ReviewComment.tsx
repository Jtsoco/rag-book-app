import { CombinedBookRating } from "./bookRating";

export interface ReviewCommentProps {
  comment: string;
}

export const ReviewComment = (props: ReviewCommentProps) => {
  const { comment } = props;
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};
export interface FullReviewCommentProps extends ReviewCommentProps {
  reviewer: string;
  reviewerID: number;
  rating: number;
  ratingType: 'enjoyment' | 'literary';
  timestamp: string; // ISO string
}

export const FullReviewComment = (props: FullReviewCommentProps) => {
  const { comment, reviewer, reviewerID, rating, timestamp } = props;
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <div className="flex items-center mb-2">
        <span className="font-bold mr-2">{reviewer}</span>
        <span className="text-sm text-gray-500">{new Date(timestamp).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 mr-2">{'★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))}</span>
        <span className="text-sm text-gray-700">{rating.toFixed(1)} / 5</span>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export interface ClickableFullReviewCommentProps extends FullReviewCommentProps {
  onClick: (reviewerID: number) => void;
}

export const ClickableFullReviewComment = (props: ClickableFullReviewCommentProps) => {
  const { comment, reviewer, reviewerID, rating, ratingType, timestamp, onClick } = props;
  return (
    <div className="bg-gray-100 p-4 rounded mb-4 cursor-pointer hover:bg-gray-200" >
      <div className="flex items-center mb-2" onClick={() => {onClick(props.reviewerID)}}>
        <span className="font-bold mr-2" >{reviewer}</span>
        <span className="text-sm text-gray-500">{new Date(timestamp).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700">{comment}</p>
      <div className="flex items-center mb-2">
        <CombinedBookRating title={ratingType} rating={rating} />
      </div>
    </div>
  );
};
