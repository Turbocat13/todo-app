import { type Filter } from '../types';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
}

export function Filters({ filter, onChange }: Props) {
  return (
    <div className="filters">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        Все
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => onChange('active')}
      >
        Активные
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onChange('completed')}
      >
        Выполненные
      </button>
    </div>
  );
}