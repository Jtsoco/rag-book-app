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
