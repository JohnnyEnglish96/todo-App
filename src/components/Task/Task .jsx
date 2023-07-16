import React from 'react';
import PropTypes from 'prop-types';

import Timer from '../Timer';

const Task = ({ todoListData, deleted, editBtn, id, timerComplited, complited }) => {
  const { description, created, name } = todoListData;
  const checked = name === 'completed' ? name : '';
  const idName = `${id}toggle`;
  return (
    <div className="view">
      <input className="toggle" id={idName} type="checkbox" onChange={() => complited(id)} checked={checked} />
      <label htmlFor={idName} className="task-content">
        <span className="title">{description}</span>
        <Timer id={id} todoListData={todoListData} timerComplited={timerComplited} />
        <span className="description">{created}</span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="edit" onClick={editBtn} />
      <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={deleted} />
    </div>
  );
};

Task.propTypes = {
  todoListData: PropTypes.object.isRequired,
  deleted: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};

export default Task;
