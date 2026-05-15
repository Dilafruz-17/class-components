import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { fetchPokemons } from '../api/pokemonApi';
import { PokemonDetail } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getValue, setValue } = useLocalStorage();

  const page = parseInt(searchParams.get('page') ?? '1');

  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(getValue());

  const LIMIT = 20;

  const loadPokemons = async (searchQuery: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const results = await fetchPokemons(searchQuery, currentPage, LIMIT);
      setPokemons(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(query, page);
  }, [page]);

  const handleSearch = (newQuery: string) => {
    setValue(newQuery);
    setQuery(newQuery);
    setSearchParams({ page: '1' });
    loadPokemons(newQuery, 1);
  };

  const handleCardClick = (name: string) => {
    navigate(`/detail/${name}?page=${page}`);
  };

  const handlePrev = () => {
    if (page > 1) setSearchParams({ page: String(page - 1) });
  };

  const handleNext = () => {
    setSearchParams({ page: String(page + 1) });
  };

  const hasDetails = window.location.pathname.includes('/detail/');

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__logo">
          <h1 className="app__title">PokéSearch</h1>
        </div>
        <nav>
          <a href="/about">About</a>
        </nav>
      </header>

      <main className={`app__main ${hasDetails ? 'app__main--split' : ''}`}>
        <div className="app__left">
          <section className="app__search-section">
            <ErrorBoundary>
              <Search onSearch={handleSearch} initialValue={query} />
            </ErrorBoundary>
          </section>

          <section className="app__results-section">
            {loading ? (
              <Spinner />
            ) : (
              <ErrorBoundary>
                <CardList
                  pokemons={pokemons}
                  error={error}
                  onCardClick={handleCardClick}
                />
              </ErrorBoundary>
            )}
          </section>

          {!loading && pokemons.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={page === 1}>← Prev</button>
              <span>Page {page}</span>
              <button onClick={handleNext}>Next →</button>
            </div>
          )}
        </div>

        <div className="app__right">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainPage;