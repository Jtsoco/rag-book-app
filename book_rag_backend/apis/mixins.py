from django.http import Http404
from services import fetch_from_open_library
# from asgiref.sync import sync_to_async
from books.models import Book, Author
from rest_framework.response import Response

class AsyncAPIRetrieveModeltMixin():
    # not async yet, but the longterm goal will be to make it async
    def get(self, request, *args, **kwargs):
        self.retrieve(request, *args, **kwargs)

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
        model = self.get_queryset().model
        if model == Book:
            primaryk = "works/" + primaryk
        elif model == Author:
            primaryk = "authors/" + primaryk

        try:
            # try to get the object from database first using the primarykey
            obj = model.objects.get(pk=primaryk)
            return obj
        except model.DoesNotExist:
            # attempt to fetch from open library
            data = fetch_from_open_library(model, primaryk)
            # need to prepare/serialize the data depending on the model type, as the data from open library will be different based on the model type, and often have more data than I would want to store in the database so I need to extract the relevant data and format it correctly
            if data:
                obj = self.create_object(data, model)
                # obj = sync_to_async(model.objects.create(**data))
                return obj
            else:
                # raise 404 as it doesn't exist and can't be reached
                raise Http404

    def create_object(self, data, model):
        serialized = self.serialize_data(data, model)
        obj = model.objects.create(**serialized)
        return obj

    def serialize_data(self, data, model):

        if model == Book:
            title = data.get('title')
            open_library_key = data.get('key')
            description = data.get('description', '')
            # if no cover id, access a None
            cover_id = data.get('covers', [None])[0]
            open_library_url = f"https://openlibrary.org{data.get('key')}"
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
