import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ESCAPE_KEY: 27,
      ENTER_KEY: 13
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
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
    this.props.onEdit(this.props.todo, this.state.editText);
    this.setState({editText: this.props.todo.title});
  }

  handleKeyDown(event) {
    if (event.which === this.state.ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === this.state.ENTER_KEY) {
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

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField);
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
							onChange={() => {this.props.onToggle(this.props.todo)}}
						/>
						<label onDoubleClick={this.handleEdit}>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={() => {this.props.onDestroy(this.props.todo)}} />
            <button className="duplicate" onClick={() => {this.props.onDuplicate(this.props.todo)}} />
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
