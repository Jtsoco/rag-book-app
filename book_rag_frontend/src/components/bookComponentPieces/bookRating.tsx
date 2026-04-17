// a component for displaying a book's rating as stars

export interface BookRatingProps {
  rating: number; // 0 to 5
}

export const BookRating = (props: BookRatingProps) => {
  const { rating } = props;
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return <span className="text-yellow-500">{stars}</span>;
};
