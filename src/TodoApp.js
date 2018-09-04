import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { List } from "./components/List";
import { AddTodo } from "./components/AddTodo";

export class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos:[],
      nextId: 0
    };
  }

  addTodo = todo => {
    const {nextId} = this.state;
    this.setState({
      todos: [...this.state.todos, {id: nextId, todo: todo, active: true}],
      nextId: nextId + 1
    })
  };

  render() {
  	return (
  		<div>
        	<h2>TodoApp</h2>
          <AddTodo addTodo={this.addTodo}/>
          <List todos={this.state.todos} />
      </div>
  	);
  }

}

