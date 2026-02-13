# Development Notes

## Technologies to Use
- PostgreSQL
- Docker (?)
- REST Framework

### Notes on Technology:
PsostgreSQL uses psycopg3 (referred to as psycopg) for database interactions not included with django

## Tasks
- Create test code for practicing testing
- Develop API schema for interactions

## Considerations
- Consider using Celery to handle async tasks. For testing the API chatbot, it's not needed yet, but with multiple users, async handling for fetching data from the database, utilizing it, and sending it to the chatbot takes time.

## Remember
When I feel friction, or something feels hard, stop, be present, and learn. If something is hard, or feels unintuitive, it doesn't fit into the pattern I know, or I lack information. It's time to targeted learn then, compare what i was working on to other's code, look up tutorials with similar things I can apply, look at docs, use AI too search for similar things to save time in searching. Take a moment, be present, and learn, and remember, I need to take what is unintuitive and learn its pattern, how it connects to what I know.
Make a mindmap of something new when making it, see how it connects

## Immediate to Do:

- [x] integrate PostgreSQL to be used first
- [x] double check if I need to use a custom user type (i don't think so)
- [ ] make apps for models
- [ ] make authentication login/logout for django
- [ ] make api views for things like books
- [ ] make schema for chatbot api
- [ ] integrate it like in my test app i did
- [ ] look into using either google books or open library for search
- [ ] make dummy data of books, allow saving to database if dummy data doesn't already exist when a user saves the book/likes/rates (don't want to use api calls for every interaction)
- [ ] make specific views for homepage, book search api, chatbot

### lower priority to do:
- [ ] psycopg2 is marked in the DATABASES engine area for settings, look into psycogp3
- [ ] use different credentials for .env when using a production server, for every variable


# OpenLibrary Notes

<!-- Open library provides data dumps, all info on the current data is only 12.9 gigabytes
Given this, pull only fantasy/sci-fi/horror/speculative fiction entries from it and their authors to save on data size. -->
Actually, just take open library search, integrate it, and when a page is clicked, attempt to retrieve info from my database first. if it doesn't exist, call open library to get meta data, get it and save it to db, then provide info to the user

Search: Open Library query
Individual book page: check my db first, if not there open library data request, save the data

If a user rating/bookshelf model exists, then it will have a corresponding entry in the database. So any info that needs to be passed to the chatbot based on user data will exist and be available.

also cache author models the same way, when a book or an author is clicked
