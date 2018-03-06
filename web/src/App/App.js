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
	}

	componentWillMount() {
		this.createUser();
	}

	updateShowing(nowShowing) {
		this.setState({ nowShowing });
	}

	async createUser() {
		const machineId = Utils.getUuid();
		const response = await Requester.CreateUser(machineId);
		const user = response.data.message;
		this.setState({ user });
	}

	async addTodo(title) {
		const response = await Requester.AddTodo(title, this.state.user._id);
		const todo = response.data.message;
		let todos = this.state.todos;
		todos.push(todo);
		this.setState({todos});
	}

	async duplicate(todo) {
		const response = await Requester.DuplicateTodo(todo._id);
		const duplicateTodo = response.data.message;
		let todos = this.state.todos;
		todos.push(duplicateTodo);
		this.setState({ todos });
	}

	clearCompleted() {
		this.state.todos.forEach(todo => {
			if (todo.completed) {
				this.destroy(todo);
			}
		});
	}

	cancel() {
		this.setState({ editing: null });
	}

	edit(todo) {
		this.setState({ editing: todo._id })
	}

	async destroy(todo) {
		if (!todo.completed) {
			todo.completed = true;
		}
		await Requester.DeleteTodo(todo._id)
		let todos = this.state.todos.filter(curTodo => {
			return curTodo._id !== todo._id;
		});
		this.setState({ todos });
	}

	toggle(todo) {
		let todos = this.state.todos;
		todos.forEach((val, index) => {
			if (val._id === todo._id) {
				Requester.UpdateTodo(todos[index]._id, todos[index].title, !todos[index].completed);
				todos[index].completed = !todos[index].completed;
			}
		});
		this.setState({ todos });
	}

	async save(todo, newText) {
		const todoIndex = this.state.todos.indexOf(todo);
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
		todos.forEach( todo => {
			Requester.UpdateTodo(todo._id, todo.title, !todo.completed);
			todo.completed = !todo.completed;
		});
		this.setState({ todos });
	}

	getShownTodos() {
		const todos = this.state.todos;
		let shownTodos = todos.filter( todo => {
			switch (this.state.nowShowing) {
			case "ACTIVE_TODOS":
				return !todo.completed;
			case "COMPLETED_TODOS":
				return todo.completed;
			case "ALL_TODOS":
			default:
				return true;
			}
		});
		return shownTodos;
	}

	getActiveTodoCount() {
		const activeTodoCount = this.state.todos.reduce( (sum, todo) => {
			return todo.completed ? sum : sum + 1;
		}, 0);
		return activeTodoCount;
	}

	getCompletedTodoCount() {
		const activeTodos = this.getActiveTodoCount();
		console.log(activeTodos);
		return this.state.todos.length - activeTodos;
	}

	renderTodoItems(shownTodos) {
		let todoItems = shownTodos.map((todo) => {
			return (
				<TodoItem
					key={ todo._id }
					todo={ todo }
					onToggle={ todo => this.toggle(todo) }
					onDestroy={ todo => this.destroy(todo) }
					onDuplicate={ todo => this.duplicate(todo) }
					onEdit={ todo => this.edit(todo) }
					editing={ this.state.editing === todo._id}
					onSave={ todo => this.save(todo) }
					onCancel={ todo => this.cancel(todo) }
				/>
			);
		});
		return todoItems;
	}

	renderMain() {
		if (this.state.todos.length) {
			return (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={ () => this.toggleAll() }
						checked={ this.getActiveTodoCount() === 0 }
					/>
					<ul className="todo-list">
						{ this.renderTodoItems(this.getShownTodos()) }
					</ul>
				</section>
			);
		} else {
			return null;
		}
	}

	renderFooter() {
		const activeTodoCount = this.getActiveTodoCount();
		const completedCount = this.getCompletedTodoCount();
		if (activeTodoCount || completedCount) {
			return (
				<Footer
					count={ activeTodoCount }
					completedCount={ activeTodoCount }
					nowShowing={ types => this.state.nowShowing(types) }
					updateShowing={ todo => this.updateShowing(todo) }
					onClearCompleted={ () => this.clearCompleted() }
				/>
			);
		} else {
			return null;
		}
	}

  render() {
    return (
      <div>
        <Header addTodo={ title => this.addTodo(title) } />
        { this.renderMain() }
        { this.renderFooter() }
      </div>
    );
  }
}

export default App;
