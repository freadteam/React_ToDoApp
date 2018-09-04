import React from 'react';
import ReactDOM from 'react-dom';

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const list = this.props.todos.map(todo => {
    	return (
    		<li key={todo.id}>
    			<input type="checkbox"  /> {todo.todo}
    		</li>    			
        );
    })

  	return (
  		<div>
  			<h2>List</h2>
  			{list}
        </div>
  	);
  }
}