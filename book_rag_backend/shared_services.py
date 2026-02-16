import requests
import os
from dotenv import load_dotenv

# params dict:
"""
https://openlibrary.org/dev/docs/api/search
https://openlibrary.org/search/howto

query_params example:
query_params = {
                    "q": "harry potter",
                    "title": "harry potter",
                    "subject": "fantasy",
                    "place": "england",
                    "person": "jk rowling",
                    "language": "english",
                    "publisher": "scholastic",
                    "sort": "new | old | random | key",
                    page: 2,
                    limit: 20
                }
"""

def to_open_library(url, query_params={}):
    # options are empty by default
    load_dotenv()
    # this will send to open library with the necessary headers and options to retrieve the data
    base_url = "https://openlibrary.org/"
    end_url = '.json'
    full_url = base_url + url + end_url
    headers = {
        "User-Agent": f"{os.getenv('MYAPPNAME')} ({os.getenv('MYEMAIL')})"
    }

    print(f"Sending request to Open Library API at {full_url} with query params: {query_params}")
    response = requests.get(full_url, headers=headers, params=query_params)
    print(f"Received response from Open Library API with status code: {response.status_code}")
    return response


url = 'search'
query_params = {
    "q": "harry potter",
    "page": 2,
    "limit": 10
}

# response = to_open_library(url, query_params)
# response = to_open_library('works/OL45804W')
# response = to_open_library('authors/OL23919A')
# print(response)




# author data example:
# {
#     "name": "J.K. Rowling",
#     "birth_date": 31 July 1965,
#     "key": "/authors/OL23919A",
#     "bio": {
#         "type": "/type/text",
#         "value": "Joanne \"Jo\" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films."
#     "photos": [
# 5543033, -1]"
# }
# there is more, just not going to use it

# book data example (works data):
# { "title": "Harry Potter and the Philosopher's Stone",
# "key": "/works/OL45804W",
# "description": "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs.",
# "covers": [8231856],
# "author": [ "/authors/OL23919A"]
# "subjects": ["Fantasy fiction", "Magic", "Wizards", "Schools", "Juvenile fiction"]
# }
# There is more data, but i won't use it in this project
