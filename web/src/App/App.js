import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TodoItem from '../TodoItem/TodoItem';

class App extends Component {
  constructor(props) {
    super(props);

    var footer = Footer;
    var main = "";
  }

  render() {
      var todos = [];

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
            onCancel={this.cancel}
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
					<section class="main">
						<input
							class="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul class="todo-list">
							{todoItems}
						</ul>
					</section>
				);
			}
    return (
      <div>
        <Header/>
        {this.main}
        {this.footer}
      </div>
    );
  }
}

export default App;
