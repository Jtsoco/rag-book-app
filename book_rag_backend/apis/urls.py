from django.contrib import admin
from django.urls import path, include

from apis.views import BookAPIView, AuthorAPIView, BookSearchAPIView
urlpatterns = [
    # path('book/<str:pk>/', BookAPIView.as_view(), name='book-detail'),
    path('book/works/<str:pk>/', BookAPIView.as_view(), name='book-detail'),
    path('book/authors/<str:pk>/', AuthorAPIView.as_view(), name='author-detail'),
    path('search/', BookSearchAPIView.as_view(), name='book-search'),
    path('chatbot/', include('chatbot.urls')),
]
