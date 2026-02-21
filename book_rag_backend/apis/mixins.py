from django.http import Http404
from apis.services import fetch_from_open_library, search_open_library
# from asgiref.sync import sync_to_async
from books.models import Book, Author
from rest_framework.response import Response

import logging

class AsyncAPIRetrieveModeltMixin():
    # not async yet, but the longterm goal will be to make it async
    # def get(self, request, *args, **kwargs):
    #     return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        # overiding the default retrieve, so while get is just calling retrieve this makes it clear i'm overriding the retrieve method from Rest as the goal, to allow for async get_object method
        # meant to be used with a mixin that overrides get_object to allow for fetching from external api, so async get_object
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.return_response(serializer)

    def return_response(self, serializer):
        res = Response(serializer.data)
        return res


class OpenLibraryFetchIfNotFoundMixin:
    # make sure views using this are async compatible
    # this will be used for author and book views
    def get_object(self):
        # so the primary key in the url is actually the latter half of the primary key, so here append either works or authors to the front to keep consistency with open library keys

        primaryk = self.kwargs.get(self.lookup_field)
        print('primary key from url:', primaryk)
        model = self.get_queryset().model
        obj = None

        if model == Book:
            full_key = f"/works/{primaryk}"

        elif model == Author:
            full_key = f"/authors/{primaryk}"

        obj = self.try_to_get_object(model, full_key)
        if obj:
            return obj
        else:
            raise Http404("Object not found and could not be fetched from Open Library")

    def try_to_get_object(self, model, full_key):
        # returning none means this method can be reused when a book is trying to get authors to add to the db when first created
        try:
            # try to get the object from database first using the primarykey
            obj = model.objects.get(pk=full_key)
            return obj
        except model.DoesNotExist:
            # attempt to fetch from open library
            print('fetching from open library')
            # TODO error handling here
            data = fetch_from_open_library(full_key)
            # need to prepare/serialize the data depending on the model type, as the data from open library will be different based on the model type, and often have more data than I would want to store in the database so I need to extract the relevant data and format it correctly
            if data:
                obj = self.create_object(data, model)
                # obj = sync_to_async(model.objects.create(**data))
                return obj
            else:
                # raise 404 as it doesn't exist and can't be reached
                return None

    def create_object(self, data, model):
        serialized = self.serialize_data(data, model)
        obj = model.objects.create(**serialized)
        if model == Book:
            self.link_authors_to_book(data, obj)
        return obj

    def link_authors_to_book(self, data, book_obj):
        # go through authors, if already in db add to book many to many relationship, if not try to fetch, and add to book then
        authors_data = data.get('authors', [])
        for author in authors_data:
            author_key = author.get('author', {}).get('key')
            if author_key:
                obj = self.try_to_get_object(Author, author_key)  # This will fetch and create the author if it doesn't exist
                if obj:
                    book_obj.authors.add(obj)

    def serialize_data(self, data, model):
        # only purpose is to prepare data to be saved to database
        if model == Book:
            title = data.get('title')
            open_library_key = data.get('key')
            description = data.get('description', '')
            # if no cover id, access a None
            cover_id = data.get('covers', [None])[0]
            # need to make it so it looks at authors also, and creates a connection to the AuthorBook model
            return {
                'title': title,
                'open_library_key': open_library_key,
                'description': description,
                'cover_id': cover_id,
            }
        elif model == Author:
            name = data.get('name')
            open_library_key = data.get('key')
            # bio can be a dictionary with a value field
            bio = data.get('bio', {''}).get('value', '')
            birth_date = data.get('birth_date', '')
            return {
                'name': name,
                'open_library_key': open_library_key,
                'bio': bio,
                'birth_date': birth_date
            }


class OpenLibrarySearchMixin:

    def get(self, request, format=None):
        query = request.query_params.get('q', '')
        page = request.query_params.get('page', 1)
        limit = request.query_params.get('limit', 50)
        response_data = self.get_search(query=query, page=page, limit=limit)
        return Response(response_data)

    def get_search(self, query, page=1, limit=50):
        # meant to be used with other
        raise NotImplementedError("Subclasses must implement get_search method")

    def remove_duplicate_keys(self, data):
        # this is meant to be used for search results, as I only want to save works, not editions, so if there are multiple editions with the same work key, I want to remove the duplicates
        seen_keys = set()
        unique_data = []
        for work in data.get('docs', []):
            work_key = work.get('key')
            if work_key and (work_key not in seen_keys):
                seen_keys.add(work_key)
                work_data = self.serialize_search_data(work)
                unique_data.append(work_data)
        return unique_data


class OpenLibraryBookSearchMixin(OpenLibrarySearchMixin):
    def get_search(self, query, page=1, limit=50):
        response_data = search_open_library(url='search', query_params={'q': query, 'page': page, 'limit': limit}, search=True)
        unique_data = self.remove_duplicate_keys(response_data)
        return_data = {
            'numFound': response_data.get('numFound', 0),
            'start': response_data.get('start', 0),
            'page': page,
            'showin_unique': len(unique_data),
            'retrieved': limit,
            'docs': unique_data,
        }
        return Response(return_data)



    def serialize_search_data(self, data):
        # this is meant to be used for search results, as the data from search results is different than the data from the works endpoint, so I need to extract the relevant data and format it correctly
        title = data.get('title')
        open_library_key = data.get('key')
        description = data.get('description', '')
        cover_id = data.get('cover_i', None)
        author_key = data.get('author_key', [])
        author_name = data.get('author_name', [])
        return {
            'title': title,
            'open_library_key': open_library_key,
            'description': description,
            'cover_id': cover_id,
            'author_key': author_key,
            'author_name': author_name,
        }
