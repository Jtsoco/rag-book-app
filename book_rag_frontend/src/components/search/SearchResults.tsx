import { BookCard} from '../BookCard';

export interface SearchResultBook {
  title: string;
  author: string;
  coverUrl: string;
}
export interface SearchResultsProps {
  results: SearchResultBook[];
  onBookClick?: (book: SearchResultBook) => void;
  mode: 'cover' | 'detailed';
}

// this will be a scrollable list of book cards
// two modes for display, detailed for more robust book cards like mini focus ones, and cover for just bookCards like in the BookCard component
export const SearchResults = (props: SearchResultsProps) => {
  const { results, onBookClick, mode } = props;

  return (
    <div className={`search-results-container overflow-y-auto p-4 ${mode === 'cover' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-4'}`}>
      {results.map((book, index) => (
        <div key={index} onClick={() => onBookClick && onBookClick(book)} style={{ cursor: onBookClick ? 'pointer' : 'default' }}>
          {mode === 'cover' ? (
            <BookCard title={book.title} author={book.author} coverUrl={book.coverUrl} />
          ) : (
            <div className="detailed-book-card flex items-center gap-4 p-4 border rounded">
              <img src={book.coverUrl} alt={`${book.title} cover`} className="w-16 h-24 object-cover" />
              <div>
                <h3 className="text-sm font-bold">{book.title}</h3>
                <p className="text-xs">{book.author}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
