import React, { Component } from 'react';
import './todo-list-footer.css';

export default class ToDoFooterItem extends Component {
  render() {
    const { TodoFooterData } = this.props;
    return TodoFooterData.map((elem) => {
      return (
        <li key={elem.id}>
          <button className={elem.name}>{elem.label}</button>
        </li>
      );
    });
  }
}
