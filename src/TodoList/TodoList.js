import React, { Component } from 'react';
import TodoItems from "../TodoItems/TodoItems";
import Button from '@material-ui/core/Button';
import "./TodoList.css";

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(key) {
      var filteredItems = this.state.items.filter(function (item) {
        return (item.key !== key);
      });

      this.setState({
        items: filteredItems
      });
    }

    render() {
      return (
        <div className="todoListMain">
          <h2>Tasks/To-Do List</h2>
          <div className="header">
            <form onSubmit={this.addItem}>
              <input ref={(a) => this._inputElement = a} placeholder="Enter Task">
              </input>
              <Button style={{marginLeft: 10}} type="submit" variant="contained" color="primary">
                Add Task
              </Button>
            </form>
          </div>
          <TodoItems entries={this.state.items}
          delete={this.deleteItem}/>
        </div>
      )
    }
  }

export default TodoList;