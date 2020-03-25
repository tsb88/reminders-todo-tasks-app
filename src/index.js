import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from "./TodoList";

var destination = document.querySelector("#container");
// quick edit to remove node modules in git commit

ReactDOM.render(
  <div>
    <TodoList />
  </div>,
  document.getElementById('root')
);
  
  