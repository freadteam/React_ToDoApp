import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  	return (
  		<div>
        	<h2>TodoApp</h2>
      	</div>
  	);
  }
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));