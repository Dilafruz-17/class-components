import { PokemonDetail } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedSlice';

interface CardProps {
  pokemon: PokemonDetail;
  onClick: (name: string) => void;
}

function Card({ pokemon, onClick }: CardProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selected.items.some((i) => i.id === pokemon.id)
  );

  const types = pokemon.types.map((t) => t.type.name).join(', ');
  const description = `Type: ${types} | Height: ${pokemon.height} | Weight: ${pokemon.weight} | Base EXP: ${pokemon.base_experience}`;

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleItem(pokemon));
  };

  return (
    <div
      className={`card${isSelected ? ' card--selected' : ''}`}
      onClick={() => onClick(pokemon.name)}
      style={{ cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        className="card__checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
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