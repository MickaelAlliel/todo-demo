import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    var ESCAPE_KEY = 27;
	  var ENTER_KEY = 13;
  }

  handleSubmit(event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }

  handleKeyDown(event) {
    if (event.which === this.ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === this.ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value});
    }
  }

  getInitialState() {
    return {editText: this.props.todo.title};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    return (
      <div>
        <li className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing
				})}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onChange={this.props.onToggle}
						/>
						<label onDoubleClick={this.handleEdit}>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={this.props.onDestroy} />
					</div>
					<input
						ref="editField"
						className="edit"
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
				</li>
      </div>
    );
  }
}

export default TodoItem;