
from django.test import TestCase
from django.urls import reverse
from books.models import Book, Author
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

from unittest.mock import patch

# Create your tests here.
from rest_framework.test import APITestCase

class SingleChatMessageView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.url = reverse('single-chat-message')

    @patch('chatbot.services.chatbot.ask')
    def test_single_chat_message_logged_out_view(self, mock_ask):
        mock_ask.return_value = {"books": [], "assistant_reply": "This is a test response."}
        response = self.client.post(self.url, {'query': 'Test query'}, format='json')
        self.assertEqual(response.status_code, 401)

    @patch('chatbot.views.ask')
    def test_single_chat_message_logged_in_view(self, mock_ask):
        # user setup
        user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

        mock_ask.return_value = {"books": [], "assistant_reply": "This is a test response."}
        response = self.client.post(self.url, {'query': 'Test query'}, format='json')
        self.assertIn('response', response.data)
        self.assertEqual(response.data['response'], {"books": [], "assistant_reply": "This is a test response."})
