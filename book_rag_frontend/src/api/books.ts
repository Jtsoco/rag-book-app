import {
  bookInfoCarouselsMockData,
  featuredBooksMockData,
  type BookInfoCarouselApiData,
  type FeaturedBookApiData,
} from './mockData';

export const getFeaturedBooks = async (): Promise<FeaturedBookApiData[]> => {
  return featuredBooksMockData;
};

export const getBookInfoCarousels = async (): Promise<BookInfoCarouselApiData[]> => {
  return bookInfoCarouselsMockData;
};
