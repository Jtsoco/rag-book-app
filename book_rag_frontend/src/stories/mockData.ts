import type { BookCardProps } from '../components/BookCard';
import type { BookFocusComponentProps } from '../components/BookFocusComponent';
import type { FullReviewCommentProps } from '../components/bookComponentPieces/ReviewComment';

export const mockBooks: BookCardProps[] = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/id/7725946-M.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://covers.openlibrary.org/b/id/7878060-M.jpg',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://covers.openlibrary.org/b/id/7889443-M.jpg',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://covers.openlibrary.org/b/id/8417626-M.jpg',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://covers.openlibrary.org/b/id/7976599-M.jpg',
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverUrl: 'https://covers.openlibrary.org/b/id/7975644-M.jpg',
  },
  {
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    coverUrl: 'https://covers.openlibrary.org/b/id/7976518-M.jpg',
  },
];

/**
 * Returns a specified number of mock books
 * @param count - Number of books to return (defaults to all)
 * @returns Array of mock books
 */
export const getMockBooks = (count?: number): BookCardProps[] => {
  if (count === undefined) {
    return mockBooks;
  }
  return mockBooks.slice(0, Math.min(count, mockBooks.length));
};

const mockFocusReviews: FullReviewCommentProps[] = [
  {
    reviewer: 'John Doe',
    reviewerID: 123,
    comment: 'This book was fantastic! Highly recommend it to everyone.',
    rating: 4.5,
    ratingType: 'enjoyment',
    timestamp: new Date().toISOString(),
  },
  {
    reviewer: 'Jane Smith',
    reviewerID: 124,
    comment: 'A profound exploration of human nature. A must-read for literature lovers.',
    rating: 5,
    ratingType: 'literary',
    timestamp: new Date().toISOString(),
  },
];

export const mockBookFocusItems: BookFocusComponentProps[] = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American dream and the decadence of the Jazz Age.',
    coverUrl: 'https://covers.openlibrary.org/b/id/7725946-L.jpg',
    enjoymentRating: 4.5,
    literaryRating: 4.0,
    reviews: mockFocusReviews,
    onMoreInfo: () => {},
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism, surveillance, and resistance.',
    coverUrl: 'https://covers.openlibrary.org/b/id/7878060-L.jpg',
    enjoymentRating: 4.2,
    literaryRating: 4.6,
    reviews: mockFocusReviews,
    onMoreInfo: () => {},
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A coming-of-age story that confronts injustice and moral courage.',
    coverUrl: 'https://covers.openlibrary.org/b/id/7889443-L.jpg',
    enjoymentRating: 4.7,
    literaryRating: 4.8,
    reviews: mockFocusReviews,
    onMoreInfo: () => {},
  },
];

/**
 * Returns a specified number of mock book focus items
 * @param count - Number of items to return (defaults to all)
 * @returns Array of mock book focus items
 */
export const getMockBookFocusItems = (count?: number): BookFocusComponentProps[] => {
  if (count === undefined) {
    return mockBookFocusItems;
  }
  return mockBookFocusItems.slice(0, Math.min(count, mockBookFocusItems.length));
};
