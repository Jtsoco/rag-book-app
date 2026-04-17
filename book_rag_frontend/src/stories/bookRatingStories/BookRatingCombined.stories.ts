import type { Meta, StoryObj } from '@storybook/react';
import { CombinedBookRating } from '../../components/bookComponentPieces/bookRating';

const combinedBookRatingMeta = {
  title: 'Components/CombinedBookRating',
  component: CombinedBookRating,
  parameters: {
    layout: 'centered',
  },
  args: {
    rating: 3,
    title: 'Literary Rating',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CombinedBookRating>;

export default combinedBookRatingMeta;

type CombinedBookRatingStory = StoryObj<typeof combinedBookRatingMeta>;

export const Default: CombinedBookRatingStory = {
  args: {
    rating: 3,
    title: 'Literary Rating',
  },
};

export const LiteraryRating: CombinedBookRatingStory = {
  args: {
    rating: 3,
    title: 'Literary Rating',
  },
};

export const EnjoymentRating: CombinedBookRatingStory = {
  args: {
    rating: 3,
    title: 'Enjoyment Rating',
  },
};
