import React from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';

const ToDo = ({ text, todo, deleteTodo, completeTodo }) => {
  const deleteHandler = () => {
    deleteTodo(todo.id);
  };

  const completeHandler = () => {
    completeTodo(todo.id);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
      <MdCheck onClick={completeHandler} className="complete-btn" />
      <MdDelete onClick={deleteHandler} className="trash-btn" />
    </div>
  );
};

export default ToDo;
