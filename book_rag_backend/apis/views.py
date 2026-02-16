from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from books.models import Book, Author
from serializers import BookSerializer
from services import fetch_from_open_library
from django.http import Http404
from mixins import OpenLibraryFetchIfNotFoundMixin, AsyncAPIRetrieveModeltMixin


class BookAPIView(OpenLibraryFetchIfNotFoundMixin, AsyncAPIRetrieveModeltMixin, generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # book, and author, need a special get_object method
    # this method will retrieve the book based on the open library key passed in the url
    # if the book is not found, it will attempt to fetch the data from open library, store it in the database, and then return it
    # failing that, it will return a 404 error

class OpenLibraryFetchIfNotFoundMixin:
    # make sure views using this are async compatible
    # this will be used for author and book views
    def get_object(self):

        pk = self.kwargs.get(self.lookup_field)
        model = self.get_queryset().model
        try:
            return model.objects.get(**{self.lookup_field: pk})
        except model.DoesNotExist:
            # attempt to fetch from open library
            data = fetch_from_open_library(pk)
            if data:
                serialized_data = self.serialize_data(data, model)
                obj = model.objects.create(**serialized_data)
                return obj
            else:
                # raise 404 as it doesn't exist and can't be reached
                raise Http404

    def serialize_data(self, data, model):
        if model == Book:
            title = data.get('title')
            description = data.get('description')
            if isinstance(description, dict):
                description = description.get('value')
            cover_id = data.get('covers', [None])[0]
            return {
                'title': title,
                'description': description,
                'cover_id': cover_id,
                "open_library_key": data.get('key')
            }
        elif model == Author:
            name = data.get('name')
            birth_date = data.get('birth_date')
            bio = data.get('bio', '')
            if isinstance(bio, dict):
                bio = bio.get('value')
            return {
                'name': name,
                'birth_date': birth_date,
                'bio': bio,
                "open_library_key": data.get('key')
            }
