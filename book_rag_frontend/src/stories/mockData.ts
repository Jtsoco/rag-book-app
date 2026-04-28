import type { BookCardProps } from '../components/BookCard';

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
