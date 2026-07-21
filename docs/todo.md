# Frontend Todo


## Initial Todo

- [ ] TanStack error handling review: confirm root-level route boundaries strategy for errorComponent/notFoundComponent and decide final app approach. Look into lifecycle fallback order (route -> parent -> router default), when to set root errorComponent, and whether to also add root notFoundComponent. Sources: [Data Loading - Handling Errors with routeOptions.errorComponent](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#handling-errors-with-routeoptionserrorcomponent), [Data Loading - The Route Loading Lifecycle](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#the-route-loading-lifecycle), [Not Found Errors - Throwing your own notFound errors](https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-your-own-notfound-errors)

- [x] Book Card
- [x] Book Carousel Selection
- [x] Book Focus Modal
- [x] Book Main Focus Component
- [x] Book Page
- [ ] investigate optional parameters in tanstack router, how to utilize them
- [ ] create a route for book pages, based on id
- [ ] create a route for the search page
- [ ] Go over flow for logged out:
  - home page
  - search functionality
- [ ] Go over how you cache books again, was it a bulk search where you saved them after? if so, consider an index for the title, and making it so you can access a book based on the index number, or the title, for the book page
- really if it's a pain, just go and make it a fantasy book only site, download them all, and implement with ids and implement a search mechanism, but do above first


- [ ] add id to bookCards?
- [ ] reconcile using both open library api and own database
- [ ] book focus component image when by itself for error version sizing (maybe don't need to because a focus component always needs to b ein something)
- [ ] fiddle with css for reviews and such
- [ ] borders or something to help with style of book image large on focus component in carousel, maybe just let it be bigger than the background and not fit the whole thing in the height
- [ ] error branch for queries with tanstack query
- [ ] implement proper click handlers
