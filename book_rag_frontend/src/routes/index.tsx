import { createFileRoute } from '@tanstack/react-router'
import { HomePageDefault } from '#/components/HomePageLoggedOut'
import type { BookCardProps } from '#/components/BookCard'

export const Route = createFileRoute('/')({ component: App })

import { BookCarouselBulkWrapper } from '#/components/DataWrapperComponents/BookCarouselBulkWrapper'
import { BookFocusCarouselWrapper } from '#/components/DataWrapperComponents/BookFocusCarouselWrapper'

function App() {
  const handleBookClick = (book: BookCardProps) => {
    console.log('Book clicked:', book)
  }

  const handleMoreInfoClick = (book: BookCardProps) => {
    console.log('More info clicked for:', book)
  }

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
  }

  return (
    <main>
      {/* <HomePageDefault
        featuredBooks={[]}
        bookInfoCarousels={[]}
        onBookClick={handleBookClick}
        onMoreInfoClick={handleMoreInfoClick}
        onSearch={handleSearch}
      /> */}
      <BookFocusCarouselWrapper loggedin={false} onMoreInfoClick={handleMoreInfoClick} />
      <BookCarouselBulkWrapper categories={['Trending This Week', 'Literary Favorites', 'Quick Weekend Reads']} />
    </main>
  )
}
