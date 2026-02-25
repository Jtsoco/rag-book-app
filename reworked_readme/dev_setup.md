# Setup

## Prerequisites

- Python 3.x
- PostgreSQL
- pip / venv
- git
- OpenAI API key

## Installation

### Repo Setup

```command
gh repo clone Jtsoco/rag-book-app
cd rag-book-app
python -m venv .venv
source .venv/bin/activate
cd book_rag_backend
pip install -r requirements.txt
```

Deactivate venv

```command
deactivate
```

### PostgreSQL Setup

#### MacOS

- Install `brew install postgresql`
- Start `brew services start postgresql`
- Create DB `createdb devdb`
- Stop `brew services stop postgresql`

### Environment Variables

- Create `.env` in `book_rag_backend/`
- Add `.env` to .gitignore file if not there, do not commit `.env`

#### Example env

```env
DBUSER=UserName
DBPASSWORD=postgres
DBNAME=example_book_devdb
DBHOST=localhost
DBPORT=5432
MYEMAIL=example@gmail.com
MYAPPNAME=book_rag_backend_personal_example_project/0.1
OPENAI_API_KEY=example_key_hello
```

### Database Migration

```command
python manage.py migrate
```

### Running Tests

```command
python manage.py test
```

### Management Commands

Additional management commands added for the project:

#### Command to retrieve Open Library individual works data

`python manage.py export_ol <output_path> <key1> <key2> ...`
