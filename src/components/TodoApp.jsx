import React from 'react';
import { List } from './List';
import { AddTodo } from './AddTodo';

//全てのtodo一覧
export class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AddTodo 
          addTodo={this.props.addTodo}
        />
        <List 
          todos={this.props.todos} 
          deleteTodo={this.props.deleteTodo}
          changeChecked={this.props.changeChecked}
        />
      </div>
    );
  }

}

