import React, { Component } from 'react';
import InputBar from '../head-app/input-bar';
import TodoList from '../todo-list/todo-list';

import './todo-app.css';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todoListData: [
        {
          description: 'Completed task',
          created: 'created 17 seconds ago',
          id: 1,
        },
        {
          description: 'Editing task',
          created: 'created 5 minutes ago',
          id: 2,
        },
        {
          description: 'Active task',
          created: 'created 5 minutes ago',
          id: 3,
        },
      ],
    };
    this.complited = (id) => {
      this.setState(({ todoListData }) => {
        let newListData = JSON.parse(JSON.stringify(todoListData));
        const idx = newListData.findIndex((el) => el.id === id);
        let result = newListData[idx].name ? null : 'completed';
        newListData[idx].name = result;

        return {
          todoListData: newListData,
        };
      });
    };
    this.deleted = (id) => {
      this.setState(({ todoListData }) => {
        const idx = todoListData.findIndex((el) => el.id === id);
        const newListData = [
          ...todoListData.slice(0, idx),
          ...todoListData.slice(idx + 1),
        ];
        return {
          todoListData: newListData,
        };
      });
    };
  }

  render() {
    const { todoListData } = this.state;
    return (
      <section className="todoapp">
        <InputBar />
        <TodoList
          todoListData={todoListData}
          complited={(id) => this.complited(id)}
          deleted={(id) => this.deleted(id)}
        />
      </section>
    );
  }
}

export default TodoApp;
