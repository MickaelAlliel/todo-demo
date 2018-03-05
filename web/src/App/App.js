import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TodoItem from '../TodoItem/TodoItem';
import Requester from '../Utils/Requester';
import Utils from '../Utils/Utils';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			user: {},
			todos: [],
			editing: null,
			nowShowing: "ALL_TODOS",
		};

		this.addTodo = this.addTodo.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
		this.cancel = this.cancel.bind(this);
		this.edit = this.edit.bind(this);
		this.destroy = this.destroy.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.save = this.save.bind(this);
		this.createUser = this.createUser.bind(this);
		this.updateShowing = this.updateShowing.bind(this);
	}

	componentWillMount() {
		this.createUser();
	}

	updateShowing(nowShowing) {
		this.setState({ nowShowing });
	}

	async createUser() {
		let machineId = Utils.getUuid();
		let response = await Requester.CreateUser(machineId);
		let user = response.data.message;
		this.setState({ user });
	}

	async addTodo(title) {
		let response = await Requester.AddTodo(title, this.state.user._id);
		let todo = response.data.message;
		let todos = this.state.todos;
		todos.push(todo);
		this.setState({todos});
	}

	clearCompleted() {
		let todos = this.state.todos.filter(async todo => {
			await Requester.DeleteTodo(todo._id);
			return !todo.completed;
		});
		this.setState({ todos });
	}

	cancel() {
		this.setState({editing: null});
	}

	edit(todo) {
		this.setState({ editing: todo._id })
	}

	async destroy(todo) {
		await Requester.DeleteTodo(todo._id)
		let todos = this.state.todos.filter(curTodo => {
			return curTodo._id !== todo._id;
		});
		this.setState({ todos });
	}

	toggle(todo) {
		let todos = this.state.todos;
		todos.forEach(async (val, index) => {
			if (val._id === todo._id) {
				await Requester.UpdateTodo(todos[index]._id, todos[index].title, !todos[index].completed);
				todos[index].completed = !todos[index].completed;
			}
		});
		this.setState({ todos });
	}

	async save(todo, newText) {
		let todoIndex = this.state.todos.indexOf(todo);
		if (todoIndex === -1) {
			return;
		}
		let todos = this.state.todos;
		todos[todoIndex].title = newText;
		this.setState({ editing: null });
		await Requester.UpdateTodo(todos[todoIndex]._id, todos[todoIndex].title, todos[todoIndex].completed);
	}

	toggleAll() {
		let todos = this.state.todos;
		todos.forEach(val => {
			Requester.UpdateTodo(val._id, val.title, !val.completed);
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
						key={todo._id}
						todo={todo}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo._id}
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
						updateShowing={this.updateShowing}
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
