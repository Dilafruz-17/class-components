import { PokemonDetail } from '../../types';
import Card from '../Card/Card';

interface CardListProps {
  pokemons: PokemonDetail[];
  error: string | null;
  onCardClick: (name: string) => void;
}

function CardList({ pokemons, error, onCardClick }: CardListProps) {
  if (error) {
    return (
      <div className="results-error">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="results-empty">
        <p>No Pokémon found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="card-list">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardList;