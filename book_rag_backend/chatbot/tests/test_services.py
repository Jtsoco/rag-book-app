from django.test import TestCase
from unittest.mock import patch

# Create your tests here.
from ..services.chatbot import ask
from .mock_data import mock_output_text
from rest_framework.test import APITestCase
from chatbot.tests.get_book_author_data import get_mock_book_author_info
from books.models import Book, Author, BookshelfBook
from django.contrib.auth.models import User

class ChatbotAskMethodTestCase(TestCase):

    def create_book_author_data(self, user):
        user_ratings = [5,4,3,3,5,4,4]
        info = get_mock_book_author_info()
        count = 0
        for item in info:
            book = item.get('book')
            author = item.get('authors')[0]
            # save book to database
            book_obj = Book.objects.create(
                title=book['title'],
                open_library_key=book['open_library_key'],
                description=book['description'],
                cover_id=book['cover_id']
            )
            # save author if not present
            author_obj, created = Author.objects.get_or_create(
                name=author['name'],
                open_library_key=author['open_library_key'],
                bio=author['bio'],
            )
            # add author to book
            book_obj.authors.add(author_obj)
            book_obj.save()
            bookshelf_book = BookshelfBook.objects.create(
                book=book_obj,
                enjoyment_rating=user_ratings[count % len(user_ratings)],
                literary_rating=user_ratings[4],
                user=user
            )
            count += 1

    @patch('chatbot.services.chatbot.send_to_gpt')
    def test_ask(self, mock_send_to_gpt):
        import json
        user = User.objects.create_user(username='testuser', password='testpassword')
        self.create_book_author_data(user)

        class Response:
            def __init__(self, output_text):
                self.output_text = json.dumps(output_text)

        def mock_side_effect(formatted_query, client=None):
            return Response(mock_output_text)

        mock_send_to_gpt.side_effect = mock_side_effect

        response = ask("What's a fun fantasy adventure with a western feel, but with swords? 3 recommendations please")
        self.assertIsInstance(response, dict)
        self.assertIn("books", response)
        self.assertIn("assistant_reply", response)

    def test_get_user_data(self):
        user = User.objects.create_user(username='testuser', password='testpassword')
        self.create_book_author_data(user)

        from chatbot.services.chatbot import get_user_data
        user_data = get_user_data(user)
        self.assertIsInstance(user_data, list)
        self.assertGreater(len(user_data), 0)
        self.assertIn('book__title', user_data[0])
        self.assertIn('book__open_library_key', user_data[0])
        self.assertIn('enjoyment_rating', user_data[0])
