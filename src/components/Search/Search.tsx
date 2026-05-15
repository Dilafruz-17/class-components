import { useState, ChangeEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

function Search({ onSearch, initialValue }: SearchProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const { setValue } = useLocalStorage();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setValue(trimmed);
    setInputValue(trimmed);
    onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search Pokémon (e.g. pikachu)..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-bar__button" onClick={handleSearch}>
        <span>Search</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </div>
  );
}

export default Search;