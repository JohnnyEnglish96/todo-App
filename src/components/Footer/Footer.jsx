/* eslint-disable no-debugger */
import React, { useState } from 'react';

import FooterFilter from '../FooterFilter';
import './Footer.css';

const Footer = ({ selectedList, todoListData }) => {
  const initialState = [
    { btnClassName: 'selected', btnLabel: 'All', id: 1 },
    { btnClassName: null, btnLabel: 'Active', id: 2 },
    { btnClassName: null, btnLabel: 'Completed', id: 3 },
  ];
  const [todoFooterData, setTodoFooterData] = useState(initialState);

  const clickedFilterBtn = (id) => {
    selectedList(id);
    const newListData = [...todoFooterData];
    newListData.forEach((el) => {
      el.btnClassName = null;
    });
    newListData[id - 1].btnClassName = 'selected';
    setTodoFooterData(newListData);
  };

  const clickedFooterBtn = (id) => {
    selectedList(id);
  };

  const countLeft = todoListData.filter((el) => el.name === null || el.name === 'hidden' || el.activeCount).length;

  return (
    <footer className="footer">
      <span className="todo-count">{countLeft} items left</span>
      <ul className="filters">
        <FooterFilter todoFooterData={todoFooterData} clicked={clickedFilterBtn} />
      </ul>
      <button type="button" className="clear-completed" onClick={() => clickedFooterBtn(4)}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
