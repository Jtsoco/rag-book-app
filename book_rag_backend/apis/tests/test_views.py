# apis/tests.py
from django.test import TestCase
from rest_framework.test import APITestCase
from unittest.mock import patch
from django.urls import reverse  # Add this import
from books.models import Book, Author
from apis.serializers import BookSerializer
# from apis.services import fetch_from_open_library

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

    def test_author_created(self):
        author = Author.objects.create(
            name="Test Author",
            open_library_key="/authors/OL123A",
            bio="A test author",
            birth_date="1900-01-01"
        )
        self.assertEqual(Author.objects.count(), 1)
        self.assertEqual(author.name, "Test Author")
        self.assertEqual(author.open_library_key, "/authors/OL123A")

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

    # @patch('apis.mixins.fetch_from_open_library')
    # def test_retrieve_non_existing_book_success(self, mock_fetch):
    #     mock_fetch.return_value = {
    #         'title': 'Fetched Book',
    #         'key': '/works/OL45804W',
    #         'description': 'Fetched description',
    #         'covers': [12345]
    #     }
    #     url = reverse('book-detail', kwargs={'pk': 'O45804W'})  # Generates '/api/book/works/OL456/'
    #     response = self.client.get(url)

    #     print(response)
    #     self.assertEqual(response.status_code, 200)
    #     book = Book.objects.get(open_library_key='/works/OL45804W')
    #     self.assertEqual(book.title, 'Fetched Book')
    #     serializer = BookSerializer(book)
    #     self.assertEqual(response.data, serializer.data)

    @patch('apis.mixins.fetch_from_open_library')
    def test_retrieve_non_existing_book_failure(self, mock_fetch):
        mock_fetch.return_value = None
        url = reverse('book-detail', kwargs={'pk': 'OL789'})  # Generates '/api/book/works/OL789/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        self.assertFalse(Book.objects.filter(open_library_key='/works/OL789').exists())

    @patch('apis.mixins.fetch_from_open_library')
    def test_retrieve_nonexisting_book_with_nonexisting_authors(self, mock_fetch):
        def mock_side_effect(arg):
            if arg == '/works/OL45805W':
                return {
                    'title': 'Fetched Book with Authors',
                    'key': '/works/OL45805W',
                    'description': 'Fetched description with authors',
                    'covers': [12345],
                    'authors': [
                        {'author': {'key': '/authors/OL34184A'}}
                    ]
                }
            elif arg == '/authors/OL34184A':
                return {
                    'name': 'Fetched Author',
                    'key': '/authors/OL34184A',
                    'bio': {'value': 'Fetched author bio'},
                    'birth_date': '1900-01-01'
                }
            return None

        mock_fetch.side_effect = mock_side_effect
        url = reverse('book-detail', kwargs={'pk': 'OL45805W'})  # Generates '/api/book/works/OL45805W/'
        response = self.client.get(url)

        print(response)
        self.assertEqual(response.status_code, 200)
        book = Book.objects.get(open_library_key='/works/OL45805W')
        self.assertEqual(book.title, 'Fetched Book with Authors')
        self.assertEqual(book.authors.count(), 1)

    @patch('apis.mixins.fetch_from_open_library')
    def test_retrieve_nonexisting_book_with_existing_authors(self, mock_fetch):
        def mock_side_effect(arg):
            if arg == '/works/OL45805W':
                return {
                    'title': 'Fetched Book with Authors',
                    'key': '/works/OL45805W',
                    'description': 'Fetched description with authors',
                    'covers': [12345],
                    'authors': [
                        {'author': {'key': '/authors/OL34184A'}}
                    ]
                }

            return None
        Author.objects.create(
            name="Existing Author",
            open_library_key="/authors/OL34184A",
            bio="An existing author",
            birth_date="1900-01-01"
        )



        mock_fetch.side_effect = mock_side_effect
        url = reverse('book-detail', kwargs={'pk': 'OL45805W'})  # Generates '/api/book/works/OL45805W/'
        response = self.client.get(url)

        print(response)
        self.assertEqual(response.status_code, 200)
        book = Book.objects.get(open_library_key='/works/OL45805W')
        self.assertEqual(book.title, 'Fetched Book with Authors')
        self.assertEqual(book.authors.count(), 1)

class AuthorAPIViewTest(APITestCase):
    def setUp(self):
        self.client = self.client_class()

    @patch('apis.mixins.fetch_from_open_library')
    def test_creating_author_when_non_existent(self, mock_fetch):
        def mock_side_effect(arg):
            if arg == '/authors/OL34185A':
                return {
                    'name': 'New Fetched Author',
                    'key': '/authors/OL34185A',
                    'bio': {'value': 'New fetched author bio'},
                    'birth_date': '1900-01-01'
                }
            return None

        mock_fetch.side_effect = mock_side_effect
        url = reverse('author-detail', kwargs={'pk': 'OL34185A'})
        response = self.client.get(url)

        print(response)
        self.assertEqual(response.status_code, 200)
        author = Author.objects.get(open_library_key='/authors/OL34185A')
        self.assertEqual(author.name, 'New Fetched Author')
        self.assertEqual(author.bio, 'New fetched author bio')


class SearchAPIViewTest(APITestCase):

    def setUp(self):
        self.client = self.client_class()

    @patch('apis.mixins.search_open_library')
    def test_search_books(self, mock_search):
        from data_configs import unformatted_results, formatted_results

        def mock_side_effect(query, page=1, limit=50):
            return unformatted_results

        mock_search.side_effect = mock_side_effect
        url = reverse('book-search') + '?q=test&page=1&limit=10'
        response = self.client.get(url)
        print(response)
        self.assertEqual(response.status_code, 200)
        print('Response data:', response.data)
        self.assertEqual(len(response.data.get('docs', [])), 10)
        self.assertEqual(response.data.get('docs', [])[0].get('title'), formatted_results.get('docs', [])[0].get('title'))
        self.assertEqual(response.data.get('docs', [])[0].get('key'), formatted_results.get('docs', [])[0].get('key'))
        self.assertEqual(formatted_results, response.data)
