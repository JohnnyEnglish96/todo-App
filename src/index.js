import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './components/todo-app/todo-app';

import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<TodoApp />);
