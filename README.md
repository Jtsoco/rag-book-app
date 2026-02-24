# ReadMe

## Overview

A Work in Progress book app project with the goal of incorporating a Retrieval Augmented Generation Chatbot that can utilize user data to give more personalized recommendations, utilizing both user query and user data to provide an optimal recommendation.

## Backend

[Documentation](book_rag_backend/docs)
[Dev Notes](book_rag_backend/docs/dev_notes.md)
[Dev Setup](book_rag_backend/docs/dev_setup.md)

Using:
- Django
- Django Rest Framework
- OpenAI API python library
- Open Library Data/API (Responses for books, authors are cached to reduce API calls)

Current Status:
Can combine user data and query to create prompt for OpenAI API, send, and receive response.

## Frontend

Current plan is to utilize:
- Tanstack React
- React Bootstrap for styling
- BetterAuth
