import { Component } from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ThrowError from './components/ThrowError/ThrowError';
import { fetchPokemons } from './api/pokemonApi';
import { SearchState } from './types';

class App extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: '',
      results: [],
      loading: false,
      error: null,
    };
  }

  handleSearch = async (query: string) => {
    this.setState({ loading: true, error: null, query });

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const results = await fetchPokemons(query);
      this.setState({ results, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      this.setState({ error: message, loading: false, results: [] });
    }
  };

  render() {
    const { results, loading, error } = this.state;

    return (
      <div className="app">
        <header className="app__header">
          <div className="app__logo">
            <span className="app__logo-ball">⬤</span>
            <h1 className="app__title">PokéSearch</h1>
          </div>
          <p className="app__subtitle">Discover your favourite Pokémon</p>
        </header>

        <main className="app__main">
          <section className="app__search-section">
            <ErrorBoundary>
              <Search onSearch={this.handleSearch} />
            </ErrorBoundary>
          </section>

          <section className="app__results-section">
            {loading ? (
              <Spinner />
            ) : (
              <ErrorBoundary>
                <CardList pokemons={results} error={error} />
              </ErrorBoundary>
            )}
          </section>
        </main>

        <div className="app__error-trigger">
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;