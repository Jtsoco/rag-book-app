def get_mock_book_author_info():
    import json
    with open('chatbot/tests/mock_book_author_data.json', 'r') as f:
        data = json.load(f)
    return data
