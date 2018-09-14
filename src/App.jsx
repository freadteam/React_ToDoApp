import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { List } from './components/List';
import { AddTodo } from './components/AddTodo';

 export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos:[
              //id:0, todo: text, checked: false
            ],
      nextId: 4
    };
  }

  //API------

  //apiから情報を取ってきて表示
  componentDidMount() {
    fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(data => this.setState({
        todos: data
        }));
  }

  //apiにpost（ToDoを追加）
  postTodoToAPI  = ({id: id, todo: todo, checked: checked}) => {
    return fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id,
            'todo': todo,
            'checked': false
        })
    }).then(res => res.json());

};

  // apiにput（chenkboxが押された時にcheckedのtrue/falseを切り替える）
  putTodoToAPI  = ({id: id, todo: todo, checked: checked}) => {
    return fetch('http://localhost:3000/todos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id,
            'todo': todo,
            'checked': !checked
        })
    }).then(res => res.json());
};

//apiからdelete
 deleteTodoFromAPI = id => {
    return fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    }).then(res => res.json());
};

//API------

  // ToDoを追加
  addTodo = todo => {
    const {nextId} = this.state;
    this.setState({
      todos: [...this.state.todos, {id: nextId, todo: todo, checked: false}],
      nextId: nextId + 1
    })
    this.postTodoToAPI({id: nextId, todo: todo, checked: false})
  };

  //todoを消す
  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id != id ;
      })
    });
    this.deleteTodoFromAPI(id)
  };

  // chenkboxが押された時にcheckedのtrue/falseを切り替える
  changeChecked = id => {
    const {todos} = this.state;
    const index = todos.findIndex(todo => {
        return todo.id == id
    });
    todos[index] = {id:id, todo: todos[index].todo, checked: !todos[index].checked}
    this.putTodoToAPI({id: id, todo: todos[index].todo, checked: !todos[index].checked})
    this.setState({
      todos: todos
    })
  };

  render() {
     const {todos} = this.state;
    //完了todos
    let doneTodos = todos.filter(todo => {
      return todo.checked == true;
    });
    //未完了todos
    let undoneTodos = todos.filter(todo => {
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
            <div>
              <AddTodo addTodo={this.addTodo}/>
              <List 
                todos={this.state.todos} 
                deleteTodo={this.deleteTodo}  
                changeChecked={this.changeChecked} 
              />
            </div>
          )}/>
          <Route exact path='/undone/' render={() => (
            <div>
              <AddTodo addTodo={this.addTodo} />
              <List 
                todos={undoneTodos} 
                deleteTodo={this.deleteTodo}  
                changeChecked={this.changeChecked} 
              />
            </div>            
          )}/>
          <Route exact path='/done' render={() => (
            <div>
              <AddTodo addTodo={this.addTodo} />
              <List 
                todos={doneTodos} 
                deleteTodo={this.deleteTodo}  
                changeChecked={this.changeChecked} 
              />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}