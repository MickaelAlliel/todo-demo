import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ENTER_KEY: 13
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
	}

	handleChange(event) {
		this.setState({newTodo: event.target.value});
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== this.state.ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (val) {
			this.props.model.addTodo(val);
			this.setState({newTodo: ''});
		}
	}

  render() {
    return (
        <div>
			<header className="header">
				<h1>todos</h1>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					value={this.state.newTodo}
					onKeyDown={this.handleNewTodoKeyDown}
					onChange={this.handleChange}
					autoFocus={true}
				/>
			</header>
		</div>
    );
  }
}

export default Header;
