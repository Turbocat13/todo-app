import { useState, useEffect } from 'react';
import { type Task, type Filter } from './types';
import { TaskItem } from './components/TaskItem';
import { Filters } from './components/Filters';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Список задач</h1>

      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" disabled={inputValue.trim() === ''}>
          Добавить
        </button>
      </form>

      <Filters filter={filter} onChange={setFilter} />

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty">Задач пока нет</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onRemove={deleteTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}