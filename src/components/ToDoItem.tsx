import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2"
          aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow p-1 border rounded"
            aria-label="Edit task text"
          />
        ) : (
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
          aria-label={isEditing ? 'Save edited task' : 'Edit task'}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
          aria-label={`Delete task ${todo.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}