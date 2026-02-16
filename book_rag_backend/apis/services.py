from django.http import HttpResponse, JsonResponse
from books.models import Book, Author
from shared_services import fetch_from_open_library

def fetch_from_open_library(pk):
    # this will retrieve information from open library based on model type and pk, returning data that will be used to create the object
    response = fetch_from_open_library(pk)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return None




# to get a specific work, this kind of structure:
# https://openlibrary.org/works/OL45804W.json

# to get a specific authors info, this kind of structure:
# https://openlibrary.org/authors/OL34184A.json
# author json data has these fields:
# birth_date
# death_date
# name
# bio is a dictionary with a value field inside, and a type like /type/text
# photos, an array of integers that can be used to get
def fetch_from_open_library_test(model, pk):
    if model == Book:
        # return generic data
        pass
    elif model == Author:
        # return generic data
        pass
    else:
        # raise error improper model
        pass
