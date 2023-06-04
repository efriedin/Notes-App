import React, { useState, useEffect } from 'react';
import Form from './Form';
import ToDo from './ToDo';
import './todoStyle.css';

const ToDoList = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://643efbc0b9e6d064beec702e.mockapi.io/todo');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'incomplete':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const submitTodoHandler = async (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      try {
        const response = await fetch('https://643efbc0b9e6d064beec702e.mockapi.io/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: inputText,
            completed: false
          })
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setInputText('');
      } catch (error) {
        console.log('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://643efbc0b9e6d064beec702e.mockapi.io/todo/${id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await fetch(`https://643efbc0b9e6d064beec702e.mockapi.io/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.log('Error updating todo:', error);
    }
  };

  return (
    <div>
      <header>TO-DO LIST</header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        submitTodoHandler={submitTodoHandler}
        setStatus={setStatus}
      />
      <ul className="list">
        {filteredTodos.map((todo) => (
          <ToDo
            text={todo.text}
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
