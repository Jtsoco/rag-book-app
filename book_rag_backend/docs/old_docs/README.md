# ReadMe

## Overview

A book app project with the goal of incorporating a Retrieval Augmented Generation Chatbot that can utilize user data to give more personalized recommendations, utilizing both user query and user data to provide an optimal recommendation.

## Backend

[Documentation](book_rag_backend/docs)
[Dev Notes](book_rag_backend/docs/dev_notes.md)
[Dev Setup](book_rag_backend/docs/dev_setup.md)

Using:
- Django
- Django Rest Framework
- ChatGPT library
- Open Library Data/API (will cache responses for works/authors details, and only use batch.json, will work to limit api calls) 

## Frontend

Current plan is to utilize:
- Tanstack React
- React Bootstrap for styling
- BetterAuth (?)
