import React from 'react';
import ReactDOM from 'react-dom';

export class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todo: ""};
  }

  handleChange = event => {
    const todo = event.target.value;
    this.setState({todo: todo});
  }
  
  handleSubmit = event => {
    event.preventDefault();

    this.props.addTodo(this.state.todo);
    this.setState({todo: ""});
  }

  render() {
  	return (
  		<div>
        	<h2>AddTodo</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.todo} onChange={this.handleChange}/>
          </form>
      </div>
  	);
  }
}