from django.shortcuts import render
from rest_framework.views import APIView
# import apiview class


# Create your views here.
from rest_framework import generics

from books.models import Book, Author
from .serializers import BookSerializer, AuthorSerializer
from .services import fetch_from_open_library
from django.http import Http404
from .mixins import OpenLibraryFetchIfNotFoundMixin, AsyncAPIRetrieveModeltMixin, OpenLibraryBookSearchMixin
from rest_framework.permissions import IsAuthenticated, AllowAny


class BookAPIView(OpenLibraryFetchIfNotFoundMixin, AsyncAPIRetrieveModeltMixin, generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


    # book, and author, need a special get_object method
    # this method will retrieve the book based on the open library key passed in the url
    # if the book is not found, it will attempt to fetch the data from open library, store it in the database, and then return it
    # failing that, it will return a 404 error

class AuthorAPIView(OpenLibraryFetchIfNotFoundMixin, AsyncAPIRetrieveModeltMixin, generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class BookSearchAPIView(OpenLibraryBookSearchMixin, APIView):
    permission_classes = [AllowAny]

    ''' this view will handle searching for books based on a query, and return a list of books that match the query, with pagination support, and also remove duplicate works from the results, as I only want to save works, not editions '''
    pass


        # for now, just a basic search, plus page, with a limit of 50
        # and remove duplicate works, as i'm not saving editions, just works, so any edition that comes up with the same work key will be considered a duplicate and removed from the results
        # so a query like /search?q=*search_term*&page=*page_number&limit=50 will be used
