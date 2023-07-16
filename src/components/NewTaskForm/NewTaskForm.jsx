import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ addNewTask, updateTime }) => {
  const [taskDescription, setDescription] = useState('');
  const [taskMin, setMin] = useState('');
  const [taskSec, setSec] = useState('');

  const textInput = useRef(null);

  const focusTextInput = () => {
    textInput.current.focus();
  };

  useEffect(() => {
    focusTextInput();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const min = Math.round(taskMin);
    const sec = Math.round(taskSec);

    if (taskDescription.trim()) {
      addNewTask(taskDescription, min, sec);
    }

    setDescription('');
    setMin('');
    setSec('');
  };

  const handleChange = (event) => {
    updateTime();
    const inputValue = event.target.placeholder;
    switch (inputValue) {
      case 'Min':
        setMin(event.target.value);
        break;
      case 'Sec':
        setSec(event.target.value);
        break;
      default:
        setDescription(event.target.value);
        break;
    }
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        type="text"
        placeholder="Task"
        ref={textInput}
        value={taskDescription}
        onChange={handleChange}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        value={taskMin}
        onChange={handleChange}
        required
        min={0}
        max={1440}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        value={taskSec}
        onChange={handleChange}
        min={0}
        max={60}
        required
      />
      <input className="submitForm" type="submit" />
    </form>
  );
};

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
