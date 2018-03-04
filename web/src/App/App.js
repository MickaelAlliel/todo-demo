import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TodoItem from '../TodoItem/TodoItem';
import Requester from '../Utils/Requester';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			user: {},
			todos: [],
			editing: null
		};

		this.addTodo = this.addTodo.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
		this.cancel = this.cancel.bind(this);
		this.edit = this.edit.bind(this);
		this.destroy = this.destroy.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.save = this.save.bind(this);
	}
	
	componentWillMount() {

	}

	addTodo(title) {
		let todos = this.state.todos;
		todos.push({id: title, title: title, completed: false});
		this.setState({todos});
	}

	clearCompleted() {
		let todos = this.state.todos.filter(todo => {
			return !todo.completed;
		});
		this.setState({ todos });
	}

	cancel() {
		this.setState({editing: null});
	}

	edit(todo) {

	}

	destroy(todo) {
		let todos = this.state.todos.filter(curTodo => {
			return curTodo.id != todo.id;
		});
		this.setState({ todos });
	}

	toggle(todo) {
		let todos = this.state.todos;
		todos.forEach((val, index) => {
			if (val.id == todo.id) {
				todos[index].completed = !todos[index].completed;
			}
		});
		this.setState({ todos });
	}

	save(todo) {
		this.setState({editing: null});
	}

	toggleAll() {
		let todos = this.state.todos;
		todos.forEach(val => {
			val.completed = !val.completed;
		});
		this.setState({ todos });
	}

  render() {
      var todos = this.state.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case "ACTIVE_TODOS":
					return !todo.completed;
				case "COMPLETED_TODOS":
					return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo.id}
						onSave={this.save.bind(this, todo)}
            onCancel={this.cancel.bind(this)}
          />
				);
			}, this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				this.footer =
					<Footer
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={this.state.nowShowing}
						onClearCompleted={this.clearCompleted}
					/>;
			}

			if (todos.length) {
				this.main = (
					<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul className="todo-list">
							{todoItems}
						</ul>
					</section>
				);
			}
    return (
      <div>
        <Header addTodo={this.addTodo} />
        {this.main}
        {this.footer}
      </div>
    );
  }
}

export default App;
