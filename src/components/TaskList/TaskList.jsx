import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

const TaskList = ({ todoListData, complited, deleted, editBtn, timerComplited, submitValue }) => {
  const textInput = useRef(null);
  const [focusActive, setFocusActive] = useState(false);
  const focusTextInput = () => {
    if (textInput.current) {
      return textInput.current.focus();
    }
    return null;
  };

  useEffect(() => {
    if (!focusActive) return;
    focusTextInput();
  }, [focusActive]);

  const editBtnPressed = (event) => {
    setFocusActive(true);
    editBtn(event);
  };

  const submitChange = (event) => {
    const { value, id } = event.target;
    setFocusActive(false);
    if (event.code === 'Enter') {
      if (!value.trim()) return;
      submitValue(id, value);
    }
    if (event.code === 'Escape') {
      submitValue(id, null);
    }
  };

  const timerFinished = (id) => {
    setFocusActive(false);
    timerComplited(id);
  };

  const elements = todoListData.map((elem) => {
    return (
      <li key={elem.id} id={elem.id} className={elem.name}>
        <Task
          todoListData={elem}
          name={elem.name}
          complited={complited}
          timerComplited={timerFinished}
          deleted={deleted}
          editBtn={editBtnPressed}
          id={elem.id}
        />
        {elem.name === 'editing' ? (
          <input
            ref={textInput}
            id={elem.id}
            type="text"
            className="edit"
            defaultValue={todoListData[elem.id - 1].description}
            onKeyDown={submitChange}
          />
        ) : null}
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todoListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  complited: PropTypes.func.isRequired,
  deleted: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};

export default TaskList;
