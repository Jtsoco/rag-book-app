import { useQuery } from '@tanstack/react-query'
import { featuredBooksMockData, type FeaturedBookApiData } from '#/api/mockData'
import { BookFocusComponent } from '../BookFocusComponent'
import { Carousel } from '../Carousel'

interface BookFocusCarouselWrapperProps {
	loggedin: boolean
	onMoreInfoClick?: (book: FeaturedBookApiData) => void
	height?: string
	width?: string
}



export const BookFocusCarouselWrapper = (props: BookFocusCarouselWrapperProps) => {
	const fetchFocusBooksByCategory = async (): Promise<FeaturedBookApiData[]> => {
		// For now, return mock data and switch grouping based on auth state.
		const categories = props.loggedin ? ['Personalized Picks'] : ['Featured']

		return featuredBooksMockData
	}

	const { isPending, data } = useQuery({
		queryKey: ['focus-books', props.loggedin],
		queryFn: fetchFocusBooksByCategory,
	})

	if (isPending) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <div>No data found</div>
	}

	return (
		<div>
					<Carousel height={props.height ?? 'h-[50vh]'} width={props.width ?? 'w-full'}>
						{data.map((book, index) => (
							<BookFocusComponent
								key={`FocusBook-${index}`}
								{...book}
								onMoreInfo={() => {
									props.onMoreInfoClick?.(book)
								}}
							/>
						))}
					</Carousel>
		</div>
	)
}
