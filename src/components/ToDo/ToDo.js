import React from 'react'
import { MdCheck, MdDelete } from 'react-icons/md'

const ToDo = ( { text, todo, todos, setTodos }) => {

    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }

    const completeHandler = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id){
                return {
                    ...item, completed: !item.completed
                };
            }
            return item;
        }));
    };

  return (
    <div className='todo'>
        <li className={`todo-item ${todo.completed ? "completed" : ''}`}>{text}</li>
        <MdCheck onClick={completeHandler} className='complete-btn'></MdCheck>
        <MdDelete onClick={deleteHandler} className='trash-btn'></MdDelete>

    </div>
  )
}

export default ToDo