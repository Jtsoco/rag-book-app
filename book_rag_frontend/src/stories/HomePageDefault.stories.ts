import type { Meta, StoryObj} from "@storybook/react";
import { HomePageDefault } from "#/components/HomePageDefault";
import { getMockBooks, getMockBookFocusItems } from "./mockData";
import { type BookFocusComponentProps } from "#/components/BookFocusComponent";

const meta = {
  title: "Pages/HomePageDefault",
  component: HomePageDefault,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePageDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    featuredBooks: getMockBookFocusItems(),
    bookInfoCarousels: [

      {
        title: "Recommended for You",
        books: getMockBooks(10),
        onBookClick: (book) => console.log("Clicked book:", book),
      },
      {
        title: "Top Rated",
        books: getMockBooks(10),
        onBookClick: (book) => console.log("Clicked book:", book),
      },
      {
        title: "New Releases",
        books: getMockBooks(10),
        onBookClick: (book) => console.log("Clicked book:", book),
      },
    ],
    onBookClick: (book) => console.log("Clicked book:", book),
    onMoreInfoClick: (book) => console.log("More info clicked for book:", book),
    onSearch: (query) => console.log("Search query:", query),
  },

};
