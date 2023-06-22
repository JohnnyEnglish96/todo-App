import React, { Component } from 'react';

export default class TasksFilter extends Component {
  constructor() {
    super();
    this.clicked = (id) => {
      const { clicked } = this.props;
      clicked(id);
    };
  }

  render() {
    const { TodoFooterData } = this.props;
    return TodoFooterData.map((elem) => {
      return (
        <li key={elem.id}>
          <button type="button" className={elem.btnClassName} onClick={() => this.clicked(elem.id)}>
            {elem.btnLabel}
          </button>
        </li>
      );
    });
  }
}
