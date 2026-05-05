import type { Meta, StoryObj } from '@storybook/react';
import { BookPage } from '../components/BookPage';
import { type FullReviewCommentProps } from '../components/bookComponentPieces/ReviewComment';

const meta = {
  title: 'Components/BookPage',
  component: BookPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookPage>;

export default meta;
const exampleReviews: FullReviewCommentProps[] = [
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Gatsby',
    author : 'F. Scott Fitzgerald',
    description: 'A novel about the American dream and the decadence of the Jazz Age.',
    coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
    enjoymentRating: 4.5,
    literaryRating: 4.0,
    reviews: exampleReviews,
    onMoreInfo: () => alert('More info clicked'),
  },
};

export const NoCover: Story = {
  args: {
    title: '1984',
    author : 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    coverUrl: 'https://invalid-url-for-testing.com/no-image.jpg',
    enjoymentRating: 4.0,
    literaryRating: 4.5,
    reviews: exampleReviews,
    onMoreInfo: () => alert('More info clicked'),
  },
};
