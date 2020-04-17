import React, { useState } from 'react';

import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const App = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1); // [0, 1, 3] when splice(2, 1)
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <br />
      <ul>
        {todos.map((todo: ITodo, index: number) => (
          <li key={index}>
            <span
              style={{ textDecoration: todo.complete ? 'line-through' : '' }}
            >
              {todo.text}{' '}
            </span>
            <button type="button" onClick={() => completeTodo(index)}>
              {todo.complete ? 'Completed' : 'Complete'}
            </button>
            <button type="button" onClick={() => removeTodo(index)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
