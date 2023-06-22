import React, { Component } from 'react';

import TasksFilter from '../TasksFilter';
import './Footer.css';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      TodoFooterData: [
        { btnClassName: 'selected', btnLabel: 'All', id: 1 },
        { btnClassName: null, btnLabel: 'Active', id: 2 },
        { btnClassName: null, btnLabel: 'Completed', id: 3 },
      ],
    };

    this.clickedFilterBtn = (id) => {
      this.setState(({ TodoFooterData }) => {
        const { selectedList } = this.props;
        selectedList(id);
        const newListData = JSON.parse(JSON.stringify(TodoFooterData));
        newListData.forEach((el) => {
          el.btnClassName = null;
        });
        newListData[id - 1].btnClassName = 'selected';
        return {
          TodoFooterData: newListData,
        };
      });
    };
    this.clickedFooterBtn = (id) => {
      const { selectedList } = this.props;
      selectedList(id);
    };
  }

  componentDidMount() {
    const { TodoFooterData } = this.state;
    const { btnClassName } = TodoFooterData[0];
    let oneCall = 1;
    if (btnClassName === 'selected') {
      if (!oneCall) {
        const { defaultBtnPressed } = this.props;
        defaultBtnPressed();
        oneCall--;
      }
    }
  }

  render() {
    const { TodoFooterData } = this.state;
    const { todoListData } = this.props;
    const countLeft = todoListData.filter(
      (el) =>
        !Object.prototype.hasOwnProperty.call(el, 'name') || el.name === null || el.name === 'hidden' || el.activeCount
    ).length;

    return (
      <footer className="footer">
        <span className="todo-count">{countLeft} items left</span>
        <ul className="filters">
          <TasksFilter TodoFooterData={TodoFooterData} clicked={this.clickedFilterBtn} />
        </ul>
        <button type="button" className="clear-completed" onClick={() => this.clickedFooterBtn(4)}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
