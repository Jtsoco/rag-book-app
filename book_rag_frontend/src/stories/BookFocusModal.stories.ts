import type { Meta, StoryObj } from '@storybook/react';

import { BookFocusModal } from '../components/BookFocusModal';

const meta = {
  title: 'Components/BookFocusModal',
  component: BookFocusModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookFocusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Gatsby',
    author : 'F. Scott Fitzgerald',
    description: 'A novel about the American dream and the decadence of the Jazz Age.',
    coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
    enjoymentRating: 4.5,
    literaryRating: 4.0,
    onClose: () => alert('Modal closed'),
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
    onClose: () => alert('Modal closed'),
    onMoreInfo: () => alert('More info clicked'),
  },
};
