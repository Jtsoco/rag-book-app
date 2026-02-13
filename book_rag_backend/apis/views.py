from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from books.models import Book
from serializers import BookSerializer


class BookAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # book, and author, need a special get_object method
    # this method will retrieve the book based on the open library key passed in the url
    # if the book is not found, it will attempt to fetch the data from open library, store it in the database, and then return it
    # failing that, it will return a 404 error

class OpenLibraryFetchIfNotFoundMixin:
    # this will be used for author and book views
    def get_object(self):

        pk = self.kwargs.get(self.lookup_field)
        model = self.get_queryset().model
        # try:
        #     return model.objects.get(**{self.lookup_field: pk})
        # except model.DoesNotExist:
