import React from 'react'
import { MdSquare } from 'react-icons/md'

const Form = ({ inputText, setInputText, todos, setTodos, submitTodoHandler, setStatus }) => {

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    };

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

  return (
    <form onSubmit={submitTodoHandler}>
        <input 
            value={inputText} 
            onChange={inputTextHandler} 
            type='text' 
            className='todo-input'
        ></input>
        <button 
            className='todo-button' 
            type='submit'
        >
            <MdSquare></MdSquare>
        </button>
        <div className='select'>
            <select onChange={statusHandler} name='todos' className='filter-todo'>
                <option value="all">All</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
            </select>
        </div>
    </form>
  );
};

export default Form