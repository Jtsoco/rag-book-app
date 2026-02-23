from django.test import TestCase
from unittest.mock import patch

# Create your tests here.
from ..services.chatbot import ask
from .mock_data import mock_output_text


class OneShotChatbotTestCase(TestCase):

    @patch('chatbot.services.chatbot.send_to_gpt')
    def test_ask(self, mock_send_to_gpt):
        class Response:
            def __init__(self, output_text):
                self.output_text = output_text

        def mock_side_effect(formatted_query, client=None):
            return Response(mock_output_text)

        mock_send_to_gpt.side_effect = mock_side_effect

        response = ask("What's a fun fantasy adventure with a western feel, but with swords? 3 recommendations please")
        self.assertIsInstance(response, dict)
        self.assertIn("books", response)
        self.assertIn("assistant_reply", response)
        print(response)
