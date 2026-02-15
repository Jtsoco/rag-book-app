from django.db import models

# Create your models here.
# book model, modified from original schema to match open libraries api better, but has fewer fields, built from the bulk data handed out by their site and the open library api documentation. instead of being a data json field, i'm going to make a specific field for each piece of data that i want to use
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

# book model

class Book(models.Model):
    title = models.CharField(max_length=500)
    open_library_key = models.CharField(max_length=50, primary_key=True)
    description = models.TextField(null=True, blank=True)
    cover_id = models.IntegerField(null=True, blank=True)
    # open_library_url = models.URLField(max_length=200, null=True, blank=True) with the key, i can easily reconstruct the url, so no need to store it
    # isbn = models.CharField(max_length=13, null=True, blank=True)
    # isbn is for a specific version, but i'm using the open library key for works as a whole instead, so not a single isbn will be used for each book therefore no need for the field as of now

# fields of
# title
# open-library-key (this will be primariy key, )
# description
# cover-id for accessing cover images from open library
# isbn

# bookshelf-book model
# fields of
# foreign key: open library key
# foreign key: user id
# those two fields together make a primary key, and both will be indexed for faster lookup when retrieving similary users bookshelf data, and together they must be unique
# enjoyment rating 0-5  stars, allow null, integer field,
# literary rating 0-5 stars, allow null, integer field

class BookshelfBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    enjoyment_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)])
    literary_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)])

# author model
# fields of
# name
# open-library-key (primary key)
# bio

class Author(models.Model):
    name = models.CharField(max_length=200)
    open_library_key = models.CharField(max_length=50, primary_key=True)
    bio = models.TextField(null=True, blank=True)
    birth_date = models.CharField(max_length=100, null=True, blank=True)

# author-book many to many connector model
# fields of
# foreign key: open library book key
# foreign key: open library author key

class AuthorBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)


# subject model

class Subject(models.Model):
    name = models.CharField(max_length=200)
    # there is no library key for subjects, so use int as primary key to save data, and then just look up name through connection

# subject-book many to many connector model

class BookSubject(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)






# take the author keys provided in the works data, and make a many to many connector based on the open library key and author key

# make a subeject model, and then make a many to many connector based on the open library key and subject key
# so if a subject is provided for the first time in the works data, add it. then, make the many to many. otherwise, just make the many to many connector. While making the database models, just have a dict with subjects until then, that leads to their key, as there aren't many subjects and so won't take much memory to hold them all and instant lookup saves time. Once saved to db, their id is their key

# after doing that, make an author model, and go through author data looking at all unique instances in the many to many connectors, and then take any author that matches and save to the database
