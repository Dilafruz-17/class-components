import { Component, ChangeEvent } from 'react';

const STORAGE_KEY = 'pokemon-search-term';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    this.state = {
      inputValue: saved,
    };
  }

  componentDidMount() {
    const { inputValue } = this.state;
    this.props.onSearch(inputValue);
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';

    if (trimmed === saved) return;

    localStorage.setItem(STORAGE_KEY, trimmed);
    this.setState({ inputValue: trimmed });
    this.props.onSearch(trimmed);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search Pokémon (e.g. pikachu)..."
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className="search-bar__button" onClick={this.handleSearch}>
          <span>Search</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    );
  }
}

export default Search;