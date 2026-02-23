import json
# from .verify_books import verify_all
from openai import OpenAI
import os
import dotenv
from .context import get_context, get_schema
# will use response api


def _get_client(api_key=None):
    if api_key is None:
        dotenv.load_dotenv()
        api_key = os.getenv("OPENAI_API_KEY")
    return OpenAI(api_key)


def ask(query, user=None, client=None):
    if client is None:
        client = _get_client()

    user_data = get_user_data(user)
    formatted_query = _format_query(query, user_data)
    response = client.responses.create(**formatted_query)

    # get messages for gpt,
        # first initial context message explaing what it does
            # role: developer content: the message
        # then build user profile, send it
        # final message specifying role: user content: query
    # response = get_book_recommendation(query, user_data)
    processed_response = process_reply(response)
    return processed_response


def get_user_data(user):
    if not user:
        return None
    else:
        return None
        # not implemented yet
    # get user data from db, including bookshelf data and ratings, and return it in a format that can be sent to gpt


def _format_query(query, user_data, tools=[], model='gpt-5-nano', reasoning={"effort": "low"}):
    input = query
    context = get_context()
    schema = get_schema()
    if user_data:
        # convert user_data to string, then enter it
        input += f"\nUser Data: {user_data}"

    formatted = {
        'instructions': context,
        'input': input,
        'tools': tools,
        'text': {schema},
        'model': model,
        "reasoning": reasoning
    }
    return formatted


def process_reply(reply):
    try:
        response_data = json.loads(reply)
        books = response_data.get("books", [])
        assistant_reply = response_data.get("assistant_reply", "Sorry, I couldn't process your request.")
        if (books is None) or (books == []):
            verified_books = []
        else:
            # later, use method to verify against my db or external api
            return {'books': verified_books, 'assistant_reply': assistant_reply}
    except json.JSONDecodeError:
        return {'books': [], 'assistant_reply': "Sorry, I couldn't understand the response from the recommendation system."}
