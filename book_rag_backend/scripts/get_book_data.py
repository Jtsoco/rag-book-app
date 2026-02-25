import json
from typing import Iterable, Dict, Any
from time import sleep
from apis.services import fetch_from_open_library

all_authors = set()

def _fetch_work(work_key: str) -> Dict[str, Any]:
    """
    GET /works/{work_key}.json and return the raw response.
    `work_key` may be with or without the leading "/works/".
    """
    if not work_key.startswith("/"):
        work_key = f"works/{work_key}"
    print('fetching work:', work_key)
    return fetch_from_open_library(f"{work_key}")


def _fetch_author(author_key: str) -> Dict[str, Any]:
    """
    GET /authors/{author_key}.json and return the raw response.
    the OpenLibrary author objects in a work look like
    {'author': {'key': '/authors/OL23919A'}}.
    """
    if author_key.startswith("/authors/"):
        path = f"{author_key}"
    else:
        path = f"authors/{author_key}"
    return fetch_from_open_library(path)


def normalize_work(work: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert the OL work JSON into the same structure you use for
    `BookSerializer`/`Book` creation.
    """
    book = {
        "title": work.get("title"),
        "open_library_key": work.get("key"),      # e.g. "/works/OL82563W"
        "description": _extract_description(work),
        "cover_id": work.get("covers", [None])[0],
    }
    # authors will be filled in separately
    return book


def _extract_description(work: Dict[str, Any]) -> str | None:
    desc = work.get("description")
    if isinstance(desc, dict):
        return desc.get("value")
    return desc


def fetch_work_with_authors(work_key: str) -> Dict[str, Any]:
    """
    Return a dict with `book` and `authors` keys; the latter is a list of
    author dicts suitable for serialisation / dumping.
    """
    work = _fetch_work(work_key)
    result = {"book": normalize_work(work), "authors": []}

    for a in work.get("authors", []):
        author_key = a.get("author", {}).get("key")
        if not author_key:
            continue
        if author_key in all_authors:

            result["authors"].append({"open_library_key": author_key})
            continue

        all_authors.add(author_key)
        auth = _fetch_author(author_key)
        result["authors"].append(
            {
                "name": auth.get("name"),
                "open_library_key": auth.get("key"),
                "bio": _extract_description(auth),
            }
        )

    return result


def bulk_export(work_keys: Iterable[str], output_path: str) -> None:
    """
    Iterate `work_keys`, fetch each work+authors and write a JSON array to
    `output_path`.  Existing file will be overwritten.
    """
    records = []
    for key in work_keys:
        try:
            records.append(fetch_work_with_authors(key))
            sleep(1) # be nice to the api
        except Exception as exc:
            # log/ignore as you prefer
            print(f"failed to fetch {key}: {exc}")
    with open(output_path, "w", encoding="utf-8") as fp:
        json.dump(records, fp, indent=2, ensure_ascii=False)


keys = [
    # way of kings
    "/OL15358691W",
    # words of radiance
    '/OL16813053W',
    # oathbringer
    '/OL17834026W',
    # gardens of the moon
    '/OL5734756W',
    # deadhouse gates
    '/OL5734770W',
    # memories of ice
    '/OL5734773W',
    # gunmetal gods
    '/OL26856527W',
]

# if __name__ == "__main__":
#     bulk_export(keys, "book_data.json")
