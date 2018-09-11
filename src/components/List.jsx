import React from 'react';

export class List extends React.Component {
  constructor(props) {
    super(props);
    }

  render() {
  	const list = this.props.todos.map(todo => {
    	return (
    		<li key={todo.id}>
    			<input 
            type="checkbox" 
            checked={todo.checked}
            onChange= { () => {
            this.props.changeChecked(todo.id);
            }}
          /> 
          {todo.todo}
          <button
            onClick={() => {
              this.props.deleteTodo(todo.id);
            }}
          >
            delete
          </button>
    		</li>    			
        );
    })
  	return (
  		<div>
  			<h2>TodoList</h2>
  			<ul>
          {list}
        </ul>
        </div>
  	);
  }

}