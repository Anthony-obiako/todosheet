import { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow p-2 border rounded-l"
      />
      <button
        onClick={() => onAdd(text)}
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Add
      </button>
    </div>
  );
}