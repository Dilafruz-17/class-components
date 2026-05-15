import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPokemonDetail } from '../api/pokemonApi';
import { PokemonDetail } from '../types';
import Spinner from '../components/Spinner/Spinner';

function DetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetchPokemonDetail(name)
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  const handleClose = () => {
    navigate(`/?page=${page}`);
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!pokemon) return null;

  const types = pokemon.types.map((t) => t.type.name).join(', ');

  return (
    <div className="detail-panel">
      <button className="detail-panel__close" onClick={handleClose}>✕ Close</button>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>#{String(pokemon.id).padStart(3, '0')} {pokemon.name}</h2>
      <p>Type: {types}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base EXP: {pokemon.base_experience}</p>
    </div>
  );
}

export default DetailPage;