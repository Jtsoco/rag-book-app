from django.test import TestCase

# Create your tests here.
from .services.chatbot import ask


class ChatbotTestCase(TestCase):

    def test_ask(self):
        response = ask("What are some good books to read?")
        self.assertIsInstance(response, dict)
        self.assertIn("books", response)
        self.assertIn("assistant_reply", response)
