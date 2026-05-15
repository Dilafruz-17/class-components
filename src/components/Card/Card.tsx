import { PokemonDetail } from '../../types';

interface CardProps {
  pokemon: PokemonDetail;
  onClick: (name: string) => void;
}

function Card({ pokemon, onClick }: CardProps) {
  const types = pokemon.types.map((t) => t.type.name).join(', ');
  const description = `Type: ${types} | Height: ${pokemon.height} | Weight: ${pokemon.weight} | Base EXP: ${pokemon.base_experience}`;

  return (
    <div className="card" onClick={() => onClick(pokemon.name)} style={{ cursor: 'pointer' }}>
      <div className="card__image-wrapper">
        <img className="card__image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className="card__info">
        <div className="card__id">#{String(pokemon.id).padStart(3, '0')}</div>
        <h3 className="card__name">{pokemon.name}</h3>
        <p className="card__description">{description}</p>
        <div className="card__types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;