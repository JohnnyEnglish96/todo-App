import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.idCount = 1;
    this.createListItem = (description, min, sec, id = this.idCount++) => {
      return {
        description,
        min,
        sec,
        timeStamp: Date.now(),
        id,
        complitedBtn: false,
        active: false,
        complited: false,
      };
    };
    this.state = {
      todoListData: [],
    };

    this.addNewTask = (description, min, sec) => {
      const { todoListData } = this.state;
      const newTask = this.createListItem(description, min, sec);
      newTask.created = formatDistanceToNow(new Date(newTask.timeStamp), {
        includeSeconds: true,
      });
      const newArr = todoListData.slice();
      this.setState({ todoListData: [...newArr, newTask] });
    };

    this.complited = (id) => {
      const { todoListData } = this.state;
      const newListData = JSON.parse(JSON.stringify(todoListData));
      const idx = newListData.findIndex((el) => el.id === +id);
      if (newListData[idx].name === 'completed') {
        newListData[idx].activeCount = false;
      }
      let result = newListData[idx].name ? null : 'completed';

      if (result) {
        if (newListData[idx].active) {
          result += ' hidden';
        }
      } else if (newListData[idx].complited) {
        result = 'hidden';
      }
      newListData[idx].name = result;
      this.setState({ todoListData: newListData });
    };

    this.timerComplited = (id) => {
      const { todoListData } = this.state;
      const newListData = JSON.parse(JSON.stringify(todoListData));
      const idx = newListData.findIndex((el) => el.id === +id);
      const item = newListData[idx];
      if (!item.name || item.name === 'editing') {
        item.name = item.active ? 'completed hidden' : 'completed';
      }
      this.setState({ todoListData: newListData });
    };
    this.deleted = (event) => {
      const { todoListData } = this.state;
      const { id } = event.target.parentElement.parentElement;
      const idx = todoListData.findIndex((el) => el.id === +id);
      const newListData = [...todoListData.slice(0, idx), ...todoListData.slice(idx + 1)];
      this.setState({ todoListData: newListData });
    };
    this.editBtn = (event) => {
      const { todoListData } = this.state;
      const { id } = event.target.parentElement.parentElement;
      const newListData = JSON.parse(JSON.stringify(todoListData));
      const idx = newListData.findIndex((el) => el.id === +id);
      if (newListData[idx].name === 'completed') {
        newListData[idx].complited = true;
      }
      if (!Object.prototype.hasOwnProperty.call(newListData[idx], 'name') || newListData[idx].name === null) {
        newListData[idx].activeCount = true;
      }
      newListData[idx].name = 'editing';
      this.setState({ todoListData: newListData });
    };
    this.submitValue = (id, value) => {
      const { todoListData } = this.state;
      const newListData = JSON.parse(JSON.stringify(todoListData));
      const idx = newListData.findIndex((el) => el.id === +id);
      const item = newListData[idx];
      item.description = value ? value.trim() : item.description;
      item.activeCount = false;
      item.name = item.complited ? 'completed' : null;
      item.complited = !!item.complitedBtn;
      this.setState({ todoListData: newListData });
    };
    this.showComplitedStatus = (elem) => {
      if (elem.name === 'completed hidden') {
        elem.name = 'completed';
      }
      if (elem.name !== 'completed') {
        elem.name = 'hidden';
      }
      elem.complitedBtn = true;
      elem.complited = true;
      elem.active = false;
    };
    this.showActiveStatus = (elem) => {
      if (elem.name === 'hidden') {
        elem.name = null;
      }
      if (elem.name === 'completed') {
        elem.name += ' hidden';
      }
      elem.complitedBtn = false;
      elem.active = true;
      elem.complited = false;
    };
    this.showAllStatus = (elem) => {
      if (elem.name === 'hidden') {
        elem.name = null;
      }
      if (elem.name === 'completed hidden') {
        elem.name = 'completed';
      }
      elem.complitedBtn = false;
      elem.active = false;
      elem.complited = false;
    };

    this.selectedList = (id) => {
      const { todoListData } = this.state;
      const oldState = JSON.parse(JSON.stringify(todoListData));
      const newList = oldState
        .map((el) => {
          if (id === 3) {
            this.showComplitedStatus(el);
          }
          if (id === 2) {
            this.showActiveStatus(el);
          }
          if (id === 1) {
            this.showAllStatus(el);
          }
          if (id === 4) {
            if (el.name && el.name.includes('completed')) {
              return null;
            }
          }
          return el;
        })
        .filter((el) => el !== null);
      this.setState({ todoListData: newList });
    };
    this.updateTime = () => {
      const { todoListData } = this.state;
      const newTaskList = JSON.parse(JSON.stringify(todoListData));
      newTaskList.forEach((el) => {
        el.created = `created ${formatDistanceToNow(new Date(el.timeStamp), { includeSeconds: true })} ago`;
      });
      this.setState({ todoListData: newTaskList });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { todoListData: currentList } = this.state;
    const prevList = prevState.todoListData;
    if (JSON.stringify(currentList) !== JSON.stringify(prevList)) {
      this.updateTime();
    }
  }

  render() {
    const { todoListData } = this.state;
    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm
            todoListData={todoListData}
            addNewTask={this.addNewTask}
            idCount={this.idCount}
            updateTime={this.updateTime}
          />
        </header>
        <section className="main">
          <TaskList
            todoListData={todoListData}
            complited={this.complited}
            timerComplited={this.timerComplited}
            deleted={this.deleted}
            editBtn={this.editBtn}
            editValue={this.editValue}
            submitValue={this.submitValue}
          />

          <Footer
            selectedList={this.selectedList}
            todoListData={todoListData}
            defaultBtnPressed={this.defaultBtnPressed}
          />
        </section>
      </section>
    );
  }
}
