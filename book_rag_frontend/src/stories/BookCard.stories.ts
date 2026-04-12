import type { Meta, StoryObj } from '@storybook/react';

import { BookCard } from '../components/BookCard';

const meta = {
  title: 'Components/BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
  },
};

export const NoCover: Story = {
  args: {
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://invalid-url-for-testing.com/no-image.jpg',
  },
};
