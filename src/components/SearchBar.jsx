import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };

  return <input type="text" value={query} onChange={handleSearch} placeholder="Buscar productos..." />;
};

export default SearchBar;
