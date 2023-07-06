import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      taskDescription: '',
      taskMin: '',
      taskSec: '',
    };
    this.textInput = React.createRef();

    this.handleSubmit = (event) => {
      event.preventDefault();
      const { addNewTask } = this.props;
      const { taskDescription, taskMin, taskSec } = this.state;
      const min = Math.round(taskMin);
      const sec = Math.round(taskSec);

      if (taskDescription.trim()) {
        addNewTask(taskDescription, min, sec);
      }
      this.setState({
        taskDescription: '',
        taskMin: '',
        taskSec: '',
      });
    };

    this.handleChange = (event) => {
      this.updateTime();
      const inputValue = event.target.placeholder;
      switch (inputValue) {
        case 'Min':
          this.setState({
            taskMin: event.target.value,
          });
          break;
        case 'Sec':
          this.setState({
            taskSec: event.target.value,
          });
          break;
        default:
          this.setState({
            taskDescription: event.target.value,
          });
          break;
      }
    };
  }

  componentDidMount() {
    this.focusTextInput();
  }

  updateTime() {
    const { updateTime } = this.props;
    updateTime();
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    const { taskDescription, taskMin, taskSec } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          id="input1"
          type="text"
          placeholder="Task"
          ref={this.textInput}
          value={taskDescription}
          onChange={this.handleChange}
          required
        />
        <input
          className="new-todo-form__timer"
          id="input2"
          type="number"
          placeholder="Min"
          value={taskMin}
          onChange={this.handleChange}
          required
          min={0}
          max={1440}
        />
        <input
          className="new-todo-form__timer"
          id="input3"
          type="number"
          placeholder="Sec"
          value={taskSec}
          onChange={this.handleChange}
          min={0}
          max={60}
          required
        />
        <input className="submitForm" type="submit" />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func.isRequired,
};
