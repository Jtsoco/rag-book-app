import type { Meta, StoryObj } from '@storybook/react';

import { SearchResults } from '../components/search/searchResults';
import { type SearchResultBook } from '../components/search/searchResults';
import { mockBooks } from './mockData';

const meta = {
  title: 'Components/search/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleResults =  mockBooks as SearchResultBook[]

export const Default: Story = {
  args: {
    results: exampleResults,
    onBookClick: (book: SearchResultBook) => alert(`Clicked book: ${book.title} by ${book.author}`),
    mode: 'cover',
  },
};

export const DetailedMode: Story = {
  args: {
    results: exampleResults,
    onBookClick: (book: SearchResultBook) => alert(`Clicked book: ${book.title} by ${book.author}`),
    mode: 'detailed',
  },
};

export const NoResults: Story = {
  args: {
    results: [],
    onBookClick: (book: SearchResultBook) => alert(`Clicked book: ${book.title} by ${book.author}`),
    mode: 'cover',
  },
};
