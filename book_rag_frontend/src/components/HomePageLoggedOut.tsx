// at the very top is a small navbar with the search bar
// at the top is the Carousel with book focus components in it
// beneath that is the various BookCarousel components

import { BookCarousel } from "./BookCarousel";
import { Carousel } from "./Carousel";
import { BookFocusComponent } from "./BookFocusComponent";

// for now, just have it receive props to populate things, but eventually this will be the component that fetches data for the homepage and passes it down to the various subcomponents

import { type BookFocusComponentProps, } from "./BookFocusComponent";
import { type BookCardProps } from "./BookCard";
import { type CarouselProps as BookCarouselProps} from "./BookCarousel";
import { SearchBar } from "./header/searchBar";

export interface HomePageDefaultProps {
  featuredBooks: BookFocusComponentProps[];
  bookInfoCarousels: BookCarouselProps[];
  onBookClick: (book: BookCardProps) => void;
  onMoreInfoClick: (book: BookCardProps) => void;
  onSearch: (query: string) => void;
}

export const HomePageDefault = (props: HomePageDefaultProps) => {
  const onFeaturedMoreInfoClick = (book: BookFocusComponentProps) => {
    props.onMoreInfoClick({
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
    });
  };



  return (
    <div className="home-page-default">
      <SearchBar onSearch={props.onSearch} />

      <div>
        <Carousel height="h-[50vh]" width="w-full">
          {props.featuredBooks.map((book, index) => (
            <BookFocusComponent
              key={index}
              {...book}
              onMoreInfo={() => onFeaturedMoreInfoClick(book)}
            />
          ))}
        </Carousel>

        {props.bookInfoCarousels.map((carousel, index) => (
          <BookCarousel key={index} {...carousel} onBookClick={props.onBookClick} />
        ))}
      </div>
    </div>
  );
}
