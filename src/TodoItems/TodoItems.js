import React, { Component } from "react";
import "./TodoItems.css";

class TodoItems extends Component {

    constructor(props) {
        super(props);
     
        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return <div key={item.key} className="header">
                <li>
                    {item.text}
                </li>
                <button>
                    Edit
                </button>
                <button onClick={() => this.delete(item.key)}>
                    Delete
                </button>
            </div>
    }

    delete(key) {
        this.props.delete(key);
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