import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.handleChange = (event) => {
      const { updateTime } = this.props;
      updateTime();
      this.setState({
        inputValue: event.target.value,
      });
    };
    this.handleSubmit = (event) => {
      event.preventDefault();
      const { addNewTask } = this.props;
      const { inputValue } = this.state;
      if (!inputValue.trim()) return;
      addNewTask(inputValue.trim());
      this.setState({
        inputValue: '',
      });
    };
  }

  render() {
    const { inputValue } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          value={inputValue}
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func.isRequired,
};
