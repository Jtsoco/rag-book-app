# Design Decisions

## Open Library Integration Strategy

### Important Considerations

- The dump data provided yearly is too large for a personal project and my current costs.
- Open Library asks to cache data to prevent too many calls

### My Integration

- Cache Book, Author data in database after first retrieval from Open Library
- View firsts checks database for object with given key, then retrieves from Open Library
- Open Library Key as primary key, allowing same key for database lookup or API call
- Calls to Open Library have user-agent headers with app name/email
- Django Management script using a list of keys to get info for dummy test data, 1s sleep in consideration of Open Library

## Data Model Choices

- 'Book' and 'Author' user 'open_library_key' as PK, maps 1:1 with Open Library simplifying lookup
- M2M 'Author <-> Book'
- Separate 'Subject' model with M2M - flexible tagging
- 'BookshelfBook' - dual rating (enjoyment vs literary) for richer user preference
- 'AuthorWorksPaginationCache' - OneToOne with Author, stores paginated works as ArrayField, only present for current implementation that caches Open Library data in order to allow Author details to display their works without needing to collect each works data from Open Library

## Chatbot Architecture

Implemented:

- [x] version 0.1
- [ ] version 0.2

### Version 0.1

- Single-shot design (no conversation history), simple, stateless version
- OpenAI Responses API, utilizing structured JSON Schema
- User book ratings + titles serialized into prompt with user query

## Authentication

- JSON Web Token auth + session auth (DRF)
- dj-rest-auth + django-allauth for REST auth flows
- Permission strategy: public book/author/search, authenticated chatbot onlyu

## Database Diagrams

Current models:

```mermaid
erDiagram
  USER ||--o{ BOOK_SHELF_BOOK : has
  BOOK ||--o{ BOOK_SHELF_BOOK : on
  BOOK ||--o{ AUTHOR : has
  BOOK ||--o{ SUBJECT : has
  USER {
    string username
    string password
    int user_id
    string email
    string first_name
    string last_name
  }
  BOOK {
    string title
    text description
    string open_library_key
    int cover_id
  }
  BOOK_SHELF_BOOK {
    foreign_key user_id
    foreign_key book_id
    int literary_rating
    int entertainment_rating
  }
  AUTHOR {
    string name
    string open_library_key
    text bio
    string birth_date
  }
  SUBJECT {
    int subject_id
    string name
  }
```

Future planned models:

```mermaid
erDiagram
  SERIES ||--o{ SERIES_BOOK : has
  BOOK ||--o{ SERIES_BOOK : in
  SERIES {
    string series_name
    int series_id
  }
  SERIES_BOOK {
    int book_number
    foreign_key book_id
    foreign_key series_id
  }
  BOOK {
    string title
    text description
    string open_library_key
    int cover_id
  }
```

## Future Considerations

- Implement Async for Views like Chatbot
- Chatbot User Data and Similar User Data filtering implementation (0.2)
- pgvector to utilize PostgreSQL as a vector database for semantic search with chatbot (v0.3)
- Full OL data dump feasibility (v0.4)
