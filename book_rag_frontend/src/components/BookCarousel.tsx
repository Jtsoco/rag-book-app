import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type BookCardProps } from "./BookCard";
import { BookCard } from "./BookCard";

export interface CarouselProps {
  title: string;
  books: BookCardProps[];
  onBookClick: (book: BookCardProps) => void;
}

export const BookCarousel = (props: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollRef.current;
    container?.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      container?.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector('.book-card') as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 16; // +16 for gap
    const amount = cardWidth * Math.ceil((scrollRef.current.clientWidth / cardWidth) * 0.8);
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="book-carousel mb-12" id={props.title.toLowerCase()}>
      <div className="relative px-8">

        <div
          ref={scrollRef}
          className="flex bookCardItems gap-4 overflow-x-auto py-4 px-8 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
          role="region"
          aria-label={`${props.title} carousel`}
        >
          {props.books.map((book, index) => (
            <div key={index} style={{ scrollSnapAlign: 'start', scrollMarginLeft: '1rem' }}>
              <BookCard {...book} onClick={() => props.onBookClick(book)} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll('left')}
          disabled={isAtStart}
          aria-label="Scroll carousel left"
          className="carousel-nav-btn carousel-nav-btn-left"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => handleScroll('right')}
          disabled={isAtEnd}
          aria-label="Scroll carousel right"
          className="carousel-nav-btn carousel-nav-btn-right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
