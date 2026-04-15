import { type BookCardProps } from "./BookCard";
import { BookCard } from "./BookCard";
export interface CarouselProps {
  title: string;
  books: BookCardProps[];
  onBookClick: (book: BookCardProps) => void;
}

export const BookCarousel = (props: CarouselProps) => {

  return (
    <div className="book-carousel mb-12" id={props.title.toLowerCase()}>
      <div className="flex bookCardItems gap-4 overflow-x-auto py-4 px-2 scroll-smooth">
        {props.books.map((book, index) => (
          <BookCard key={index} {...book} onClick={() => props.onBookClick(book)} />
        ))}
      </div>
    </div>
  );
}
