
def fetch_from_open_library(model, pk):
    # this will retrieve information from open library based on model type and pk, returning data that will be used to create the object
    import requests


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
