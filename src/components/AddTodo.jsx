import React from 'react';

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
    const { todo } = this.state
    event.preventDefault();
    this.props.addTodo(todo);
    this.setState({todo: ""});
  }

  render() {
  	return (
  		<div>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              autoFocus={true} 
              value={this.state.todo} 
              onChange={this.handleChange}
            />
          </form>
      </div>
  	);
  }
}