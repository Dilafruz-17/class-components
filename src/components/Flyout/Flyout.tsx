import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAll } from '../../store/selectedSlice';
import { PokemonDetail } from '../../types';

function downloadCSV(items: PokemonDetail[]) {
  const headers = ['id', 'name', 'height', 'weight', 'base_experience', 'types', 'url'];
  const rows = items.map((p) => [
    p.id,
    p.name,
    p.height,
    p.weight,
    p.base_experience,
    p.types.map((t) => t.type.name).join(' | '),
    `https://pokeapi.co/api/v2/pokemon/${p.name}`,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${items.length}_items.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function Flyout() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selected.items);

  if (items.length === 0) return null;

  return (
    <div className="flyout">
      <span className="flyout__count">{items.length} item(s) selected</span>
      <button className="flyout__btn" onClick={() => dispatch(clearAll())}>
        Unselect all
      </button>
      <button className="flyout__btn flyout__btn--download" onClick={() => downloadCSV(items)}>
        Download
      </button>
    </div>
  );
}

export default Flyout;