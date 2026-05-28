import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { useGetPokemonsQuery } from '../store/apiSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Flyout from '../components/Flyout/Flyout';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { useState } from 'react';

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getValue, setValue } = useLocalStorage();

  const page = parseInt(searchParams.get('page') ?? '1');
  const [query, setQuery] = useState(getValue());

  const { data: pokemons = [], isLoading, isError, refetch } = useGetPokemonsQuery({ query, page });

  const handleSearch = (newQuery: string) => {
    setValue(newQuery);
    setQuery(newQuery);
    setSearchParams({ page: '1' });
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
          <ThemeToggle />
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
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <div className="error-message">
                Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
              </div>
            ) : (
              <ErrorBoundary>
                <CardList
                  pokemons={pokemons}
                  error={null}
                  onCardClick={handleCardClick}
                />
              </ErrorBoundary>
            )}
          </section>

          {!isLoading && pokemons.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={page === 1}>← Prev</button>
              <span>Page {page}</span>
              <button onClick={handleNext}>Next →</button>
            </div>
          )}

          <div className="refresh-section">
            <button className="refresh-btn" onClick={() => refetch()}>
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="app__right">
          <Outlet />
        </div>
      </main>
      <Flyout />
    </div>
  );
}

export default MainPage;