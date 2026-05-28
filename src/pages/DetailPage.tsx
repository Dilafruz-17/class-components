import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemonDetailQuery } from '../store/apiSlice';
import Spinner from '../components/Spinner/Spinner';

function DetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const { data: pokemon, isLoading, isError, refetch } = useGetPokemonDetailQuery(name ?? '');

  const handleClose = () => {
    navigate(`/?page=${page}`);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p>Xatolik yuz berdi. Pokemon topilmadi.</p>;
  if (!pokemon) return null;

  const types = pokemon.types.map((t) => t.type.name).join(', ');

  return (
    <div className="detail-panel">
      <button className="detail-panel__close" onClick={handleClose}>✕ Close</button>
      <button className="refresh-btn" onClick={() => refetch()}>🔄 Refresh</button>
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