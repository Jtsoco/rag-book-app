import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../components/Carousel";
import { BookFocusComponent } from "#/components/BookFocusComponent";
import { type FullReviewCommentProps } from "#/components/bookComponentPieces/ReviewComment";

import React from "react";

const meta: Meta<typeof Carousel> = {
title: 'Components/Carousel',
component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

const exampleReviews: FullReviewCommentProps[] = [
  {
    reviewer: 'John Doe',
    reviewerID: 123,
    comment: 'This book was fantastic! Highly recommend it to everyone.',
    rating: 4.5,
    ratingType: 'enjoyment',
    timestamp: new Date().toISOString(),
  },
  {
    reviewer: 'Jane Smith',
    reviewerID: 124,
    comment: 'A profound exploration of human nature. A must-read for literature lovers.',
    rating: 5,
    ratingType: 'literary',
    timestamp: new Date().toISOString(),
  },
];
const sampleProps = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  description: 'A novel about the American dream and the decadence of the Jazz Age.',
  coverUrl: 'https://ia600507.us.archive.org/view_archive.php?archive=/8/items/l_covers_0009/l_covers_0009_36.zip&file=0009367297-L.jpg',
  enjoymentRating: 4.2,
  literaryRating: 3.8,
  onMoreInfo: () => alert('More info clicked'),
  reviews: exampleReviews,
};
const orwell = {
    title: '1984',
    author : 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    coverUrl: 'https://invalid-url-for-testing.com/no-image.jpg',
    enjoymentRating: 4.0,
    literaryRating: 4.5,
    reviews: exampleReviews,
    onMoreInfo: () => alert('More info clicked'),
  }

export const Default: Story = {
render: () => (
<div style={{ width: 640 /* set story canvas width if desired */ }}>
<Carousel>
<BookFocusComponent {...sampleProps} title="Book One" />
<BookFocusComponent {...orwell} title="Book Two" />

</Carousel>
</div>
),
};
