import type { FullReviewCommentProps } from '../components/bookComponentPieces/ReviewComment';

export interface FeaturedBookApiData {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  enjoymentRating: number;
  literaryRating: number;
  reviews: FullReviewCommentProps[];
}

export interface CarouselBookApiData {
  title: string;
  author: string;
  coverUrl: string;
}

export interface BookInfoCarouselApiData {
  title: string;
  books: CarouselBookApiData[];
}

const mockFocusReviews: FullReviewCommentProps[] = [
  {
    reviewer: 'Avery Bennett',
    reviewerID: 101,
    comment: 'Sharp prose and memorable characters. It stayed with me for days.',
    rating: 4.6,
    ratingType: 'literary',
    timestamp: '2026-01-15T00:00:00.000Z',
  },
  {
    reviewer: 'Noah Patel',
    reviewerID: 102,
    comment: 'A page-turner with enough depth to spark a long discussion after.',
    rating: 4.4,
    ratingType: 'enjoyment',
    timestamp: '2026-02-03T00:00:00.000Z',
  },
];

export const featuredBooksMockData: FeaturedBookApiData[] = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A luminous portrait of ambition, desire, and the fragility of dreams.',
    coverUrl: 'https://covers.openlibrary.org/b/id/7725946-L.jpg',
    enjoymentRating: 4.5,
    literaryRating: 4.8,
    reviews: mockFocusReviews,
  },
  {
    title: 'Kindred',
    author: 'Octavia E. Butler',
    description: 'Time travel collides with history in a tense, deeply human narrative.',
    coverUrl: 'https://covers.openlibrary.org/b/id/9251996-L.jpg',
    enjoymentRating: 4.7,
    literaryRating: 4.7,
    reviews: mockFocusReviews,
  },
  {
    title: 'Never Let Me Go',
    author: 'Kazuo Ishiguro',
    description: 'A quiet, haunting story about memory, love, and what it means to live well.',
    coverUrl: 'https://covers.openlibrary.org/b/id/8221251-L.jpg',
    enjoymentRating: 4.3,
    literaryRating: 4.9,
    reviews: mockFocusReviews,
  },
];

export const bookInfoCarouselsMockData: BookInfoCarouselApiData[] = [
  {
    title: 'Trending This Week',
    books: [
      {
        title: '1984',
        author: 'George Orwell',
        coverUrl: 'https://covers.openlibrary.org/b/id/7878060-M.jpg',
      },
      {
        title: 'Pachinko',
        author: 'Min Jin Lee',
        coverUrl: 'https://covers.openlibrary.org/b/id/8379774-M.jpg',
      },
      {
        title: 'Station Eleven',
        author: 'Emily St. John Mandel',
        coverUrl: 'https://covers.openlibrary.org/b/id/8081640-M.jpg',
      },
      {
        title: 'The Left Hand of Darkness',
        author: 'Ursula K. Le Guin',
        coverUrl: 'https://covers.openlibrary.org/b/id/8071786-M.jpg',
      },
      {
        title: 'Beloved',
        author: 'Toni Morrison',
        coverUrl: 'https://covers.openlibrary.org/b/id/8231856-M.jpg',
      },
    ],
  },
  {
    title: 'Literary Favorites',
    books: [
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverUrl: 'https://covers.openlibrary.org/b/id/7889443-M.jpg',
      },
      {
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
        coverUrl: 'https://covers.openlibrary.org/b/id/8234156-M.jpg',
      },
      {
        title: 'Middlemarch',
        author: 'George Eliot',
        coverUrl: 'https://covers.openlibrary.org/b/id/8235083-M.jpg',
      },
      {
        title: 'Their Eyes Were Watching God',
        author: 'Zora Neale Hurston',
        coverUrl: 'https://covers.openlibrary.org/b/id/8186722-M.jpg',
      },
      {
        title: 'The Remains of the Day',
        author: 'Kazuo Ishiguro',
        coverUrl: 'https://covers.openlibrary.org/b/id/8220973-M.jpg',
      },
    ],
  },
  {
    title: 'Quick Weekend Reads',
    books: [
      {
        title: 'The Ocean at the End of the Lane',
        author: 'Neil Gaiman',
        coverUrl: 'https://covers.openlibrary.org/b/id/8235112-M.jpg',
      },
      {
        title: 'Convenience Store Woman',
        author: 'Sayaka Murata',
        coverUrl: 'https://covers.openlibrary.org/b/id/8741369-M.jpg',
      },
      {
        title: 'The Stranger',
        author: 'Albert Camus',
        coverUrl: 'https://covers.openlibrary.org/b/id/8228691-M.jpg',
      },
      {
        title: 'Foster',
        author: 'Claire Keegan',
        coverUrl: 'https://covers.openlibrary.org/b/id/10430122-M.jpg',
      },
      {
        title: 'The Sense of an Ending',
        author: 'Julian Barnes',
        coverUrl: 'https://covers.openlibrary.org/b/id/7274013-M.jpg',
      },
    ],
  },
];
