import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '../../components/header/searchBar';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search for books...",
    onSearch: (query: string, field: string) => alert(`Searching for "${query}" in field "${field}"`),
  },
};

export const WithDefaultQuery: Story = {
  args: {
    placeholder: "Search for books...",
    defaultQuery: "The Great Gatsby",
    onSearch: (query: string, field: string) => alert(`Searching for "${query}" in field "${field}"`),
  },
};

export const SearchByAuthor: Story = {
  args: {
    placeholder: "Search for books...",
    defaultQuery: "F. Scott Fitzgerald",
    onSearch: (query: string, field: string) => alert(`Searching for "${query}" in field "${field}"`),
  },
};

export const SearchByISBN: Story = {
  args: {
    placeholder: "Search for books...",
    defaultQuery: "978-3-16-148410-0",
    onSearch: (query: string, field: string) => alert(`Searching for "${query}" in field "${field}"`),
  },
};
