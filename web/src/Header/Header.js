import React, { PureComponent } from 'react';
import './Header.css';
const ENTER_KEY = 13;

class Header extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: ''
		};
	}

	handleChange(event) {
		this.setState({newTodo: event.target.value});
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (val) {
			this.props.addTodo(val);
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
					onKeyDown={e => { this.handleNewTodoKeyDown(e) }}
					onChange={e => { this.handleChange(e) }}
					autoFocus={true}
				/>
			</header>
		</div>
    );
  }
}

export default Header;
