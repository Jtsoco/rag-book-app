// import bookCard
// import Carousel
// import focus modal

// create a story that shows the carousel and when you click on a book card it opens the focus modal with the book details

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BookCarousel } from '../components/BookCarousel';
import { type BookCardProps } from '../components/BookCard';
import { mockBooks } from './mockData';

const meta = {
  title: 'Components/CarouselToModal',
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
    onBookClick: (book: BookCardProps) => alert(`Clicked book: ${book.title} by ${book.author}`),
  },
};
