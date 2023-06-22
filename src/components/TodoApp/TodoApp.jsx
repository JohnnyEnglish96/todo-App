import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

import './TodoApp.css';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.idCount = 1;
    this.createListItem = (description, id = this.idCount++) => {
      return {
        description,
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

    this.addNewTask = (description) => {
      const newTask = this.createListItem(description);
      newTask.created = formatDistanceToNow(new Date(newTask.timeStamp), {
        includeSeconds: true,
      });

      this.setState(({ todoListData }) => {
        const newArr = todoListData.slice();
        return {
          todoListData: [...newArr, newTask],
        };
      });
    };

    this.complited = (e) => {
      this.setState(({ todoListData }) => {
        const { id } = e.target.parentElement.parentElement;
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
        return {
          todoListData: newListData,
        };
      });
    };
    this.deleted = (e) => {
      this.setState(({ todoListData }) => {
        const { id } = e.target.parentElement.parentElement;
        const idx = todoListData.findIndex((el) => el.id === +id);
        const newListData = [...todoListData.slice(0, idx), ...todoListData.slice(idx + 1)];
        return {
          todoListData: newListData,
        };
      });
    };
    this.editBtn = (e) => {
      this.setState(({ todoListData }) => {
        const { id } = e.target.parentElement.parentElement;
        const newListData = JSON.parse(JSON.stringify(todoListData));
        const idx = newListData.findIndex((el) => el.id === +id);
        if (newListData[idx].name === 'completed') {
          newListData[idx].complited = true;
        }
        if (!Object.prototype.hasOwnProperty.call(newListData[idx], 'name') || newListData[idx].name === null) {
          newListData[idx].activeCount = true;
        }
        newListData[idx].name = 'editing';

        return {
          todoListData: newListData,
        };
      });
    };
    this.editValue = (id, value) => {
      this.setState(({ todoListData }) => {
        const newListData = JSON.parse(JSON.stringify(todoListData));
        const idx = newListData.findIndex((el) => el.id === +id);
        newListData[idx].description = value;
        return {
          todoListData: newListData,
        };
      });
    };
    this.submitValue = (id) => {
      this.setState(({ todoListData }) => {
        const newListData = JSON.parse(JSON.stringify(todoListData));
        const idx = newListData.findIndex((el) => el.id === +id);
        newListData[idx].activeCount = false;
        newListData[idx].name = newListData[idx].complited ? 'completed' : null;
        newListData[idx].complited = !!newListData[idx].complitedBtn;
        return {
          todoListData: newListData,
        };
      });
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
      this.setState(({ todoListData }) => {
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

        return {
          todoListData: newList,
        };
      });
    };
    this.updateTime = () => {
      this.setState(({ todoListData }) => {
        const newTaskList = JSON.parse(JSON.stringify(todoListData));
        newTaskList.forEach((el) => {
          el.created = `created ${formatDistanceToNow(new Date(el.timeStamp), { includeSeconds: true })} ago`;
        });
        return {
          todoListData: newTaskList,
        };
      });
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
// test
