import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  width: 250px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0px 0px 5px rgba(52, 152, 219, 0.5);
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };

  return <Input type="text" value={query} onChange={handleSearch} placeholder="🔍 Buscar razas de gatos..." />;
};

export default SearchBar;
