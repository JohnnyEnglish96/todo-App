import React, { Component } from 'react';
import ToDoFooterItem from './todo-list-footer-item';
import './todo-list-footer.css';

class TodoFooter extends Component {
  constructor() {
    super();
    this.state = {
      TodoFooterData: [
        { name: 'selected', label: 'All', id: 1 },
        { name: null, label: 'Active', id: 2 },
        { name: null, label: 'Completed', id: 3 },
      ],
    };
  }
  render() {
    const { TodoFooterData } = this.state;
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <ul className="filters">
          <ToDoFooterItem TodoFooterData={TodoFooterData} />
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default TodoFooter;
