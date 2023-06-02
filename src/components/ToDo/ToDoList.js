import React, { useState, useEffect } from 'react'
import Form from './Form'
import ToDo from './ToDo';
import './todoStyle.css'


const ToDoList = () => {
    const [inputText, setInputText] =useState('');
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
      filterHandler()
    }, [todos, status]);

    const filterHandler = () => {
      switch(status){
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'incomplete':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }

    const submitTodoHandler = (e) => {
      e.preventDefault();
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 }
      ]);
      setInputText('');
    };


  return (
    <div>
        <header>TO-DO LIST</header>
        <Form 
            inputText={inputText}
            setInputText={setInputText}
            todos={todos}
            setTodos={setTodos}
            submitTodoHandler={submitTodoHandler}
            setStatus={setStatus}
            
        />
        <ul className='todo-list'>
          {filteredTodos.map(todo => (
            <ToDo 
              text={todo.text}
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
    </div>
  )
}

export default ToDoList