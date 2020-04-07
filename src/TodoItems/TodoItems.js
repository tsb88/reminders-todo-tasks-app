import React, { Component } from "react";
import "./TodoItems.css";

class TodoItems extends Component {
    createTasks(item) {
        return <div className="header">
                <li key={item.key}>
                    {item.text}
                </li>
                <button>
                    Edit
                </button>
                <button>
                    Delete
                </button>
            </div>
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
};

export default TodoItems;