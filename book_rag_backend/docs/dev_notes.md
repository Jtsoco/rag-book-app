# Development Notes

## Technologies to Use
- PostgreSQL
- Docker (?)
- REST Framework

## Tasks
- Create test code for practicing testing
- Develop API schema for interactions

## Considerations
- Consider using Celery to handle async tasks. For testing the API chatbot, it's not needed yet, but with multiple users, async handling for fetching data from the database, utilizing it, and sending it to the chatbot takes time.

## Remember
When I feel friction, or something feels hard, stop, be present, and learn. If something is hard, or feels unintuitive, it doesn't fit into the pattern I know, or I lack information. It's time to targeted learn then, compare what i was working on to other's code, look up tutorials with similar things I can apply, look at docs, use AI too search for similar things to save time in searching. Take a moment, be present, and learn, and remember, I need to take what is unintuitive and learn its pattern, how it connects to what I know.
Make a mindmap of something new when making it, see how it connects

## Immediate to Do:

- [ ] integrate PostgreSQL to be used first
- [ ] double check if I need to use a custom user type (i don't think so)
- [ ] make apps for models
- [ ] make authentication login/logout for django
- [ ] make api views for things like books
- [ ] make schema for chatbot api
- [ ] integrate it like in my test app i did
- [ ] look into using either google books or open library for search
- [ ] make dummy data of books, allow saving to database if dummy data doesn't already exist when a user saves the book/likes/rates (don't want to use api calls for every interaction)
- [ ] make specific views for homepage, book search api, chatbot
