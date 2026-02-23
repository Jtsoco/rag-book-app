import json
from .verify_books import verify_all

def ask(query):
    response = get_book_recommendation(query)
    processed_response = process_reply(response)
    return processed_response

def get_book_recommendation(query):
    pass

def process_reply(reply):
    try:
        response_data = json.loads(reply)
        books = response_data.get("books", [])
        assistant_reply = response_data.get("assistant_reply", "Sorry, I couldn't process your request.")
        if (books is None) or (books == []):
            verified_books = []
        else:
            return {'books': verified_books, 'assistant_reply': assistant_reply}
    except json.JSONDecodeError:
        return {'books': [], 'assistant_reply': "Sorry, I couldn't understand the response from the recommendation system."}
