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
import { useQuery } from "@tanstack/react-query";
import { getFeaturedBooks, getBookInfoCarousels } from "#/api/books";
import {
  type BookInfoCarouselApiData,
  type FeaturedBookApiData,
} from "#/api/mockData";

export interface HomePageDefaultProps {
  featuredBooks: BookFocusComponentProps[];
  bookInfoCarousels: BookCarouselProps[];
  onBookClick: (book: BookCardProps) => void;
  onMoreInfoClick: (book: BookCardProps) => void;
  onSearch: (query: string) => void;
}

export const HomePageDefault = (props: HomePageDefaultProps) => {
  const { data: featuredBooks, isLoading: isLoadingFeaturedBooks } = useQuery<FeaturedBookApiData[]>({
    queryKey: ['featuredBooks'],
    queryFn: getFeaturedBooks,
  });
  const { data: bookInfoCarousels, isLoading: isLoadingBookInfoCarousels } = useQuery<BookInfoCarouselApiData[]>({
    queryKey: ['bookInfoCarousels'],
    queryFn: getBookInfoCarousels,
  });

  const onFeaturedMoreInfoClick = (book: FeaturedBookApiData) => {
    props.onMoreInfoClick({
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
    });
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
                onMoreInfo={() => onFeaturedMoreInfoClick(book)}
              />
            ))}
          </Carousel>

          {bookInfoCarousels?.map((carousel, index) => (
            <BookCarousel key={index} {...carousel} onBookClick={props.onBookClick} />
          ))}
        </div>
      )}
    </div>
  );
}
