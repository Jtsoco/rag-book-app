import { BookCarousel } from '../components/BookCarousel';
import { type CarouselProps } from '../components/BookCarousel';
import { BookCard, type BookCardProps } from '../components/BookCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/BookCarousel',
  component: BookCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;
const gatsby = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
      }

export const Default: Story = {
  args: {
    title: 'Recommended Books',
    books: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
      },
      {
        title: '1984',
        author: 'George Orwell',
        coverUrl: 'https://invalid-url-for-testing.com/no-image.jpg',
      },
      gatsby,
      gatsby,
      gatsby,
      gatsby,
    ],
    onBookClick: (book: BookCardProps ) => alert(`Clicked on: ${book.title} by ${book.author}`),
  },
};
