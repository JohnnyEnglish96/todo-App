import { Component } from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import '../todo-list-footer/todo-list-footer';
import TodoFooter from '../todo-list-footer/todo-list-footer';

import './todo-list.css';

export default class TodoList extends Component {
  render() {
    const { todoListData, complited, deleted } = this.props;
    const elements = todoListData.map((elem) => {
      return (
        <li key={elem.id} className={elem.name}>
          <TodoListItem
            todoListData={elem}
            complited={() => complited(elem.id)}
            deleted={() => deleted(elem.id)}
          />
          {elem.name === 'editing' ? (
            <input type="text" className="edit" placeholder="Editing task" />
          ) : null}
        </li>
      );
    });
    return (
      <section className="main">
        <ul className="todo-list">{elements}</ul>
        <TodoFooter />
      </section>
    );
  }
}
