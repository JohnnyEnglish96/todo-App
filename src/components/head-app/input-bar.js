import React, { Component } from 'react';
import './input-bar.css';

export default class InputBar extends Component {
  render() {
    return (
      <header>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}
