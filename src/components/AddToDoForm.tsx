import { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (text: string, dueDate: string | null) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return; // Prevent empty submissions
    onAdd(text, dueDate);
    setText(''); // Clear text input
    setDueDate(null); // Clear date input
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 gap-2 flex-col sm:flex-row">
      <div className="flex flex-grow gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded"
          aria-label="Task description"
        />
        <input
          type="date"
          value={dueDate || ''}
          onChange={(e) => setDueDate(e.target.value || null)}
          className="p-2 border rounded"
          aria-label="Task due date"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
}