// import bookCard
// import Carousel
// import focus modal

// create a story that shows the carousel and when you click on a book card it opens the focus modal with the book details

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BookCarousel } from '../components/BookCarousel';
import { type BookCardProps } from '../components/BookCard';


const mockBooks: BookCardProps[] = [
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
