import { type Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TaskItem({ task, onToggle, onRemove }: Props) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button onClick={() => onRemove(task.id)}>✕</button>
    </li>
  );
}