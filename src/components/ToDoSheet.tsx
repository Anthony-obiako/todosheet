'use client'

import { useState, useEffect } from 'react';
import AddTodoForm from '@/components/Addtodoform';
import TodoItem from '@/components/Todoitem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoSheet() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from localStorage on client-side mount
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, []); // Empty dependency array: runs once on mount

  useEffect(() => {
    // Save todos to localStorage whenever they change
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do Sheet</h1>
      <AddTodoForm onAdd={addTodo} />
      {todos.length === 0 ? (
        <p className="text-gray-500">No to-dos yet.</p>
      ) : (
        <ul className="space-y-4">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}