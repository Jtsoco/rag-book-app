import type { Meta, StoryObj } from '@storybook/react';

import { BookTextInfo } from '../components/bookComponentPieces/BookTextInfo';

const meta = {
  title: 'Components/BookTextInfo',
  component: BookTextInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookTextInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American dream and the decadence of the Jazz Age.',
  },
};

export const LongDescription: Story = {
  args: {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description: 'An epic novel that intertwines the lives of several families against the backdrop of the Napoleonic Wars, exploring themes of love, fate, and the nature of history.',
  },
};

export const ShortDescription: Story = {
  args: {
    title: 'Animal Farm',
    author: 'George Orwell',
    description: 'A satirical allegory about a group of farm animals who overthrow their human farmer, only to face a new tyranny under the pigs.',
  },
};
