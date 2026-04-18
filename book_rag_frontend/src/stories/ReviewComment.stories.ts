import type { Meta, StoryObj } from '@storybook/react';
import { ReviewComment, ClickableFullReviewComment, FullReviewComment } from '../components/bookComponentPieces/ReviewComment';

const meta = {
  title: 'Components/ReviewComment',
  component: ClickableFullReviewComment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ClickableFullReviewComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reviewer: 'John Doe',
    comment: 'This book was fantastic! Highly recommend it to everyone.',
    rating: 4.5,
    ratingType: 'enjoyment',
    timestamp: Date.now().toString(),
  },
};

export const LiteraryRating: Story = {
  args: {
    reviewer: 'Jane Smith',
    comment: 'A profound exploration of human nature. A must-read for literature lovers.',
    rating: 5,
    ratingType: 'literary',
    timestamp: Date.now().toString(),
  },
};

export const ShortComment: Story = {
  args: {
    reviewer: 'Alice Johnson',
    comment: 'Good read.',
    reviewerID: 123,
    rating: 3,
    ratingType: 'enjoyment',
    timestamp: Date.now().toString(),
    onClick: (reviewerID: number) => { console.log(`Reviewer ID ${reviewerID} clicked!`); },
  },
};

export const NoComment: Story = {
  args: {
    reviewer: 'Bob Brown',
    comment: '',
    reviewerID: 123,
    rating: 2,
    ratingType: 'enjoyment',
    timestamp: Date.now().toString(),
    onClick: (reviewerID: number) => { console.log(`Reviewer ID ${reviewerID} clicked!`); },
  },
};

export const LongComment: Story = {
  args: {
    reviewer: 'Charlie Davis',
    comment: 'This book was a rollercoaster of emotions. The characters were well-developed and the plot twists kept me on the edge of my seat. I couldn\'t put it down until I finished it.',
    reviewerID: 123,
    rating: 4,
    ratingType: 'enjoyment',
    timestamp: Date.now().toString(),
    onClick: (reviewerID: number) => { console.log(`Reviewer ID ${reviewerID} clicked!`); },
  },
};
