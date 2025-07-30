import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string | null;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string, newDueDate: string | null) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    onEdit(todo.id, editText, editDueDate);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center p-2 border-b gap-2.5">
      <div className="flex items-center flex-grow break-words max-w">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2"
          aria-label={`Mark ${todo.text} as ${
            todo.completed ? "incomplete" : "complete"
          }`}
        />
        {isEditing ? (
          <div className="flex flex-col gap-2 flex-grow">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="p-1 border rounded break-words"
              aria-label="Edit task text"
            />
            <input
              type="date"
              value={editDueDate || ""}
              onChange={(e) => setEditDueDate(e.target.value || null)}
              className="p-1 border rounded"
              aria-label="Edit task due date"
            />
          </div>
        ) : (
          <div className="flex flex-col break-words max-w-52">
            <span
              className={
                todo.completed ? "line-through text-gray-500" : "break-words "
              }
            >
              {todo.text}
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-600">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
          aria-label={isEditing ? "Save edited task" : "Edit task"}
        >
          {isEditing ? "Save" : "Edit"}
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
