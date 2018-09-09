import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { TodoApp } from './components/TodoApp';

 export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos:[
              //id:0, todo: text, checked: false
            ],
      nextId: 0
    };
  }

  // ToDoを追加
  addTodo = todo => {
    const {nextId} = this.state;
    this.setState({
      todos: [...this.state.todos, {id: nextId, todo: todo, checked: false}],
      nextId: nextId + 1
    })
  };

  //todoを消す
  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id != id ;
      })
    });
  }

  // chenkboxが押された時にcheckedのtrue/falseを切り替える
  changeChecked = id => {
    const {todos} = this.state;
    const index = todos.findIndex(todo => {
        return todo.id == id
    });
    todos[index] = {id:id, todo: todos[index].todo, checked: !todos[index].checked}
    this.setState({
      todos: todos
    })
  };

  render() {
    //完了todos
    let doneTodos = this.state.todos.filter(todo => {
      return todo.checked == true;
    });
    //未完了todos
    let undoneTodos = this.state.todos.filter(todo => {
      return todo.checked == false;
    });

    return(
      <BrowserRouter>
        <div>
          <h2>TodoApp</h2>
          <ul>
            <li><Link to='/'>Todo</Link></li>
            <li><Link to='/undone'>UnDoneTodo</Link></li>
            <li><Link to='/done'>DoneTodo</Link></li>
          </ul>
          
          <Route exact path='/' render={() => (
            <TodoApp 
              todos={this.state.todos}
              addTodo={this.addTodo}
              deleteTodo={this.deleteTodo}
              changeChecked={this.changeChecked}
            />
          )}/>
          <Route exact path='/undone/' render={() => (
            <TodoApp 
              todos={undoneTodos}
              deleteTodo={this.deleteTodo}
              addTodo={this.addTodo}
              changeChecked={this.changeChecked}
            />
          )}/>
          <Route exact path='/done' render={() => (
            <TodoApp
              todos={doneTodos}
              deleteTodo={this.deleteTodo}
              addTodo={this.addTodo}
              changeChecked={this.changeChecked}
            />
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}