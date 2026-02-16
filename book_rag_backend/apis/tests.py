# apis/tests.py
from django.test import TestCase
from rest_framework.test import APITestCase
from unittest.mock import patch
from django.urls import reverse  # Add this import
from books.models import Book
from apis.serializers import BookSerializer
from apis.services import fetch_from_open_library

class BookAPIViewTest(APITestCase):
    def setUp(self):
        self.client = self.client_class()

    def test_book_created(self):
        book = Book.objects.create(
            title="Test Book",
            open_library_key="/works/OL123",
            description="A test book",
            cover_id=12345
        )
        self.assertEqual(Book.objects.count(), 1)
        self.assertEqual(book.title, "Test Book")
        self.assertEqual(book.open_library_key, "/works/OL123")

    def test_retrieve_existing_book(self):
        book = Book.objects.create(
            title="Existing Book",
            open_library_key="/works/OL123",
            description="A test book",
            cover_id=12345
        )
        self.assertEqual(Book.objects.count(), 1)
        new_book = Book.objects.get(open_library_key="/works/OL123")
        self.assertEqual(new_book.title, "Existing Book")
        print('new book info:', new_book.title, new_book.open_library_key)
        # Extract pk from open_library_key (e.g., 'OL123' from '/works/OL123')
        pk = book.open_library_key.split('/')[-1]  # 'OL123'
        url = reverse('book-detail', kwargs={'pk': pk})  # Generates '/api/book/works/OL123/'
        print('Testing URL:', url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        serializer = BookSerializer(book)
        self.assertEqual(response.data, serializer.data)

    @patch('apis.services.fetch_from_open_library')
    def test_retrieve_non_existing_book_success(self, mock_fetch):
        mock_fetch.return_value = {
            'title': 'Fetched Book',
            'key': '/works/OL45804W',
            'description': 'Fetched description',
            'covers': [12345]
        }
        url = reverse('book-detail', kwargs={'pk': 'OL45804W'})  # Generates '/api/book/works/OL456/'
        response = self.client.get(url)
        print(response)
        self.assertEqual(response.status_code, 200)
        book = Book.objects.get(open_library_key='/works/OL45804W')
        self.assertEqual(book.title, 'Fetched Book')
        serializer = BookSerializer(book)
        self.assertEqual(response.data, serializer.data)

    @patch('apis.services.fetch_from_open_library')
    def test_retrieve_non_existing_book_failure(self, mock_fetch):
        mock_fetch.return_value = None
        url = reverse('book-detail', kwargs={'pk': 'OL789'})  # Generates '/api/book/works/OL789/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        self.assertFalse(Book.objects.filter(open_library_key='/works/OL789').exists())
