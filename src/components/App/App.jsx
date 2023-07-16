import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

import './App.css';

let idCount = 1;

const App = () => {
  const prefListRef = useRef([]);
  const createListItem = (description, min, sec, id) => {
    return {
      description,
      min,
      sec,
      timeStamp: Date.now(),
      created: null,
      id,
      complitedBtn: false,
      active: false,
      complited: false,
      name: null,
    };
  };

  const [todoListData, setTodoListData] = useState([]);

  const addNewTask = (description, min, sec) => {
    const newTask = createListItem(description, min, sec, idCount++);
    newTask.created = formatDistanceToNow(new Date(newTask.timeStamp), {
      includeSeconds: true,
    });
    setTodoListData((prevState) => [...prevState, newTask]);
  };

  const complited = (id) => {
    const newListData = todoListData.map((el) => {
      if (el.id === +id) {
        let result = el.name ? null : 'completed';

        if (result) {
          if (el.active) {
            result += ' hidden';
          }
        } else if (el.complited) {
          result = 'hidden';
        }

        return {
          ...el,
          name: result,
          activeCount: el.name === 'completed' ? false : el.activeCount,
        };
      }
      return el;
    });

    setTodoListData(newListData);
  };

  const timerComplited = (id) => {
    const newListData = JSON.parse(JSON.stringify(todoListData));
    const idx = newListData.findIndex((el) => el.id === +id);
    const item = newListData[idx];
    if (!item.name || item.name === 'editing') {
      item.name = item.active ? 'completed hidden' : 'completed';
    }

    setTodoListData(newListData);
  };

  const deleted = (event) => {
    const { id } = event.target.parentElement.parentElement;
    setTodoListData((prevListData) => prevListData.filter((el) => el.id !== +id));
  };

  const editBtn = (event) => {
    const { id } = event.target.parentElement.parentElement;
    const newListData = todoListData.map((el) => {
      if (el.id === +id) {
        return {
          ...el,
          name: 'editing',
          complited: el.name === 'completed' ? true : el.complited,
          activeCount: el.name === null ? true : el.activeCount,
        };
      }
      return el;
    });
    setTodoListData(newListData);
  };

  const submitValue = (id, value) => {
    const newListData = todoListData.map((el) => {
      if (el.id === +id) {
        return {
          ...el,
          name: el.complited ? 'completed' : null,
          description: value ? value.trim() : el.description,
          activeCount: false,
          complited: !!el.complitedBtn,
        };
      }
      return el;
    });
    setTodoListData(newListData);
  };

  const showComplitedStatus = (elem) => {
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

  const showActiveStatus = (elem) => {
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

  const showAllStatus = (elem) => {
    if (elem.name === 'hidden') {
      elem.name = null;
    }
    if (elem.name === 'completed hidden') {
      elem.name = 'completed';
    }
    if (elem.name === 'completed') {
      elem.name = 'completed';
    }
    elem.complitedBtn = false;
    elem.active = false;
    elem.complited = false;
  };

  const selectedList = (id) => {
    const oldState = JSON.parse(JSON.stringify(todoListData));
    const newList = oldState
      .map((el) => {
        if (id === 3) {
          showComplitedStatus(el);
        }
        if (id === 2) {
          showActiveStatus(el);
        }
        if (id === 1) {
          showAllStatus(el);
        }
        if (id === 4) {
          if (el.name && el.name.includes('completed')) {
            return null;
          }
        }
        return el;
      })
      .filter((el) => el !== null);
    setTodoListData(newList);
  };

  const updateTime = () => {
    setTodoListData((prevState) =>
      prevState.map((el) => {
        return {
          ...el,
          created: `created ${formatDistanceToNow(new Date(el.timeStamp), { includeSeconds: true })} ago`,
        };
      })
    );
  };

  useEffect(() => {
    prefListRef.current = todoListData;
  });

  useEffect(() => {
    const prevList = prefListRef.current;

    if (JSON.stringify(todoListData) !== JSON.stringify(prevList)) {
      updateTime();
    }
  }, [todoListData]);

  return (
    <section className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm todoListData={todoListData} addNewTask={addNewTask} updateTime={updateTime} />
      </header>
      <section className="main">
        <TaskList
          todoListData={todoListData}
          complited={complited}
          timerComplited={timerComplited}
          deleted={deleted}
          editBtn={editBtn}
          submitValue={submitValue}
        />

        <Footer selectedList={selectedList} todoListData={todoListData} />
      </section>
    </section>
  );
};

export default App;
