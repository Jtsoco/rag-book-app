// a component for displaying a book's rating as stars

export interface BookRatingProps {
  rating: number; // 0 to 5
}

export const BookRating = (props: BookRatingProps) => {
  const { rating } = props;
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return <span className="text-yellow-500">{stars}</span>;
};



export const BookRatingText = (props: BookRatingProps) => {
  const { rating } = props;
  return <span className="text-gray-700">{parseFloat(rating.toFixed(1))} / 5</span>;
}

export interface BookRatingTitleProps {
  title: string;
}
export const BookRatingTitle = (props: BookRatingTitleProps) => {
  const { title } = props;
  return <p className="">{title}</p>;
}

export interface CombinedBookRatingProps extends BookRatingProps, BookRatingTitleProps {}

export const CombinedBookRating = (props: CombinedBookRatingProps) => {
  const { title, rating } = props;
  return (
    <div className="flex items-center flex-col text-gray-700">
      <BookRatingTitle title={title} />
      <div className="flex items-center flex-row gap-2">
        <BookRating rating={rating} />
        <BookRatingText rating={rating} />
      </div>
    </div>
  );
};
