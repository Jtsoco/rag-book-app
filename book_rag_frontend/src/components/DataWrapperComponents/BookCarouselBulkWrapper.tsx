import { useQuery, useQueryClient } from "@tanstack/react-query";

import { bookInfoCarouselsMockData } from "#/api/mockData";

interface BookCarouselBulkWrapperProps {
  categories: string[]
}

import type { BookInfoCarouselApiData } from "#/api/mockData";

import { BookCarousel } from "../BookCarousel";


export const BookCarouselBulkWrapper = (props: BookCarouselBulkWrapperProps) => {
  const categories = props.categories
  const fetchBooksByCategory = async (): Promise<BookInfoCarouselApiData[]> => {
    // for now, just return the mock data, but eventually this will make an API call to fetch books for the given category
    const carouselData = bookInfoCarouselsMockData;

    return carouselData
    }

  const dummyonBookClick = (book: any) => {
    console.log('Book clicked:', book)
  }

  const queryClient = useQueryClient();
  const {isPending, data} = useQuery({
    queryKey: ['books', props.categories],
    queryFn: fetchBooksByCategory
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data found</div>
  }

  return (
    <div>
      {data.map((carouselData, index) => (
        <BookCarousel
          key={index}
          title={carouselData.category}
          books={carouselData.books}
          onBookClick={dummyonBookClick}
        />
      ))}
    </div>
  )


}
