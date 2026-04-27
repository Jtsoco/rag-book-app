import { useEffect, useRef } from "react";
import { Button } from "../common/button";

export interface SearchBarProps {
  placeholder?: string;
  defaultQuery?: string;
  onSearch: (query: string, field: string) => void;
}

export function SearchBar({ placeholder, defaultQuery, onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    if (defaultQuery != null && inputRef.current) {
      inputRef.current.value = defaultQuery;
    }
  }, [defaultQuery]);

  const submit = (e?: React.SubmitEvent) => {
    e?.preventDefault();
    const q = inputRef.current?.value ?? "";
    const field = selectRef.current?.value ?? "title";
    onSearch(q, field);
  };

  return (
    <form onSubmit={submit} className="bg-white p-2 rounded shadow flex items-center gap-2">
      <input
        id="searchBar"
        name="searchBar"
        ref={inputRef}
        defaultValue={defaultQuery}
        placeholder={placeholder ?? "Search Bar"}
      />
      <select name="fieldSelect" id="fieldSelect" ref={selectRef} defaultValue="title">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Search
      </button>
    </form>
  );
}
