/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

export default class TaskList extends Component {
  constructor() {
    super();
    this.submitChange = (event) => {
      const { value } = event.target;
      const { id } = event.target;
      const { submitValue } = this.props;
      if (event.code === 'Enter') {
        if (!value.trim()) return;
        submitValue(id, value);
      }
      if (event.code === 'Escape') {
        submitValue(id, null);
      }
    };
  }

  render() {
    const { todoListData, complited, deleted, editBtn, timerComplited } = this.props;
    const { name } = todoListData;
    const elements = todoListData.map((elem) => {
      return (
        <li key={elem.id} id={elem.id} className={elem.name}>
          <Task
            todoListData={elem}
            name={name}
            complited={complited}
            timerComplited={timerComplited}
            deleted={deleted}
            editBtn={editBtn}
            id={elem.id}
          />
          {elem.name === 'editing' ? (
            <input
              autoFocus
              ref={this.textInput}
              id={elem.id}
              type="text"
              className="edit"
              defaultValue={todoListData[elem.id - 1].description}
              onKeyDown={this.submitChange}
            />
          ) : null}
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todoListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  complited: PropTypes.func.isRequired,
  deleted: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};
