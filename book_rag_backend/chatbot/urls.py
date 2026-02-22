from chatbot.views import SingleChatMessageAPIView
from django.urls import path

urlpatterns = [
    path('single-message/', SingleChatMessageAPIView.as_view(), name='single-chat-message'),]
