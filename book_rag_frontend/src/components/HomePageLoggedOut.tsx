// at the very top is a small navbar with the search bar
// at the top is the Carousel with book focus components in it
// beneath that is the various BookCarousel components

import { BookCarousel } from "./BookCarousel";
import { BookPage } from "./BookPage";
import { Carousel } from "./Carousel";
import { BookFocusComponent } from "./BookFocusComponent";

// for now, just have it receive props to populate things, but eventually this will be the component that fetches data for the homepage and passes it down to the various subcomponents

import { type BookFocusComponentProps, } from "./BookFocusComponent";
import { type BookCardProps } from "./BookCard";
import { type CarouselProps as BookCarouselProps} from "./BookCarousel";
import { SearchBar } from "./header/searchBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeaturedBooks, getBookInfoCarousels } from "../api/books";

export interface HomePageDefaultProps {
  featuredBooks: BookFocusComponentProps[];
  bookInfoCarousels: BookCarouselProps[];
  onBookClick: (book: BookCardProps) => void;
  onMoreInfoClick: (book: BookCardProps) => void;
  onSearch: (query: string) => void;
}

export const HomePageDefault = (props: HomePageDefaultProps) => {

  const queryClient = useQueryClient();

  const { data: featuredBooks, isLoading: isLoadingFeaturedBooks } = useQuery<BookFocusComponentProps[]>({
    queryKey: ['featuredBooks'],
    queryFn: getFeaturedBooks,
  });
  const { data: bookInfoCarousels, isLoading: isLoadingBookInfoCarousels } = useQuery<BookCarouselProps[]>({
    queryKey: ['bookInfoCarousels'],
    queryFn: getBookInfoCarousels,
  });

  const onMoreInfoClick = (book: BookCardProps) => {
    // take it to the book page for that book
  };



  return (
    <div className="home-page-default">
      <SearchBar onSearch={props.onSearch} />

      {isLoadingFeaturedBooks || isLoadingBookInfoCarousels ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Carousel height="h-[50vh]" width="w-full">
            {featuredBooks?.map((book, index) => (
              <BookFocusComponent
                key={index}
                {...book}
                onMoreInfo={() => onMoreInfoClick(book)}
              />
            ))}
          </Carousel>

          {bookInfoCarousels?.map((carousel, index) => (
            <BookCarousel key={index} {...carousel} onBookClick={onMoreInfoClick} />
          ))}
        </div>
      )}
    </div>
  );
}
