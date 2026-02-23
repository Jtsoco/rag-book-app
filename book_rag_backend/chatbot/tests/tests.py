from django.test import TestCase
from unittest.mock import patch

# Create your tests here.
from ..services.chatbot import ask


class OneShotChatbotTestCase(TestCase):

    @patch('chatbot.services.chatbot.send_to_gpt')
    def test_ask(self):
        response = ask("What's a fun fantasy adventure with a western feel, but with swords? 3 recommendations please")
        self.assertIsInstance(response, dict)
        self.assertIn("books", response)
        self.assertIn("assistant_reply", response)
        print(response)
