import type { Meta, StoryObj } from '@storybook/react';
import { BookCarousel } from '../components/BookCarousel';
import type { BookCardProps } from '../components/BookCard';
import { mockBooks, getMockBooks } from './mockData';

const meta = {
  title: 'Components/BookCarousel',
  component: BookCarousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Must Read Classics',
    books: mockBooks,
    onBookClick: (book: BookCardProps) => console.log('Clicked book:', book),
  },
};

export const FewBooks: Story = {
  args: {
    title: 'Limited Selection',
    books: mockBooks.slice(0, 3),
    onBookClick: (book: BookCardProps) => console.log('Clicked book:', book),
  },
};

export const ManyBooks: Story = {
  args: {
    title: 'Extensive Library',
    books: [...mockBooks, ...mockBooks, ...mockBooks],
    onBookClick: (book: BookCardProps) => console.log('Clicked book:', book),
  },
};
