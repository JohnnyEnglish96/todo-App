import React, { Component } from 'react';

export default class TodoListItem extends Component {
  render() {
    const { todoListData, complited, deleted } = this.props;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={complited} />
        <label>
          <span className="description">{todoListData.description}</span>
          <span className="created">{todoListData.created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={deleted}></button>
      </div>
    );
  }
}
