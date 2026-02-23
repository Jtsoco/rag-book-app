def get_context():
    # may become dynamic later, static for now but in getter
    context = 'You are a helpful assistant that helps users find books based on their preferences. You have access to a database of books and can provide recommendations based on user input. When recommending books, provide a brief summary and the author\'s name. If you cannot find a suitable book, politely inform the user that you have no recommendations at this time. If they want more info on a book, please provide it. It is not necessary to provide book recommendations if all they want is more info on the books. There will be no followup questions, so if you need more information to provide a recommendation, just provide the best recommendation you can with the information given. Always provide a response to the user, even if it is just to say you have no recommendations. Do not offer followup'
    return context

def get_schema():
    # may change to be more dynamic in the future

    books_parameters = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "author": {"type": "string"},
                    "description": {"type": "string"},
                    "genre": {"type": "string"},
                    "comment_on_book": {"type": "string"},
                },
                "required": ["title", "author", "comment_on_book", "description", "genre"],
                "additionalProperties": False
            }
        }

    format = {
            "type": "json_schema",

            "name": "BookRecommendations",
            "schema": {

                "type": "object",
                "properties": {
                    "books": books_parameters,
                    "assistant_reply": {"type": "string"},
                },
                "additionalProperties": False,
                "required": ["assistant_reply", "books"]
            },

        }
    return format
