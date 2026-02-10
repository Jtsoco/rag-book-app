### Running a dev server

```console
<!-- create a venv -->
python -m venv .venv
<!-- start a venv -->
source .venv/bin/activate
<!-- install requirements -->
pip install -r requirements.txt

<!-- use brew on mac to install postgres -->
brew update
brew install postgresql

<!-- run a postgresql server -->
brew services start postgresql

<!-- end a postgresql server -->
brew services stop postgresql

<!-- when server is running, for first time db create a db -->
createdb devdb

```

The django settings should be this. However, if you decide to use a different name for the db you'll need to change it. if so, make sure you match all collaborators

```python
# port is the default postgres port, using generic user and password for the dev environment
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "devdb",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5432",
    }
}

```
