from rest_framework import serializers
from books.models import Book, Author


class AuthorSerializer(serializers.ModelSerializer):
    # books = BookSerializer(read_only=True, many=True)
    # make this pagination based for works
    class Meta:
        model = Author
        fields = ('name', 'open_library_key', 'bio', 'birth_date',)


class SingleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'open_library_key', 'bio', 'birth_date',)


class BookSerializer(serializers.ModelSerializer):
    authors = SingleAuthorSerializer(read_only=True, many=True)

    class Meta:
        model = Book
        fields = ('title', 'open_library_key', 'description', 'cover_id',)
