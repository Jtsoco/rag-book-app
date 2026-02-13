from django.contrib import admin
from django.urls import path, include

from apis.views import BookAPIView
urlpatterns = [
    path('book/<str:pk>/', BookAPIView.as_view(), name='book-detail'),
]
