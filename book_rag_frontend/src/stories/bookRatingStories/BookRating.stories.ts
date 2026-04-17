import type { Meta, StoryObj } from '@storybook/react';
import { BookRating} from '../../components/bookComponentPieces/bookRating';

// BookRating Stories
const bookRatingMeta = {
  title: 'Components/BookRating',
  component: BookRating,
  parameters: {
    layout: 'centered',
  },
  args: {
    rating: 3,
  },
  tags: ['autodocs'],

} satisfies Meta<typeof BookRating>;

export default bookRatingMeta;
type BookRatingStory = StoryObj<typeof bookRatingMeta>;

export const NoStars: BookRatingStory = {
  args: { rating: 0 },
};

export const TwoAndHalf: BookRatingStory = {
  args: { rating: 2.5 },
};

export const ThreeStars: BookRatingStory = {
  args: { rating: 3 },
};

export const FourStars: BookRatingStory = {
  args: { rating: 4 },
};

export const FiveStars: BookRatingStory = {
  args: { rating: 5 },
};


// CombinedBookRating Stories
