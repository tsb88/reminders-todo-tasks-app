import React, { Component } from "react";
import "./TodoItems.css";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class TodoItems extends Component {

    constructor(props) {
        super(props);
     
        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItem key={item.key}>
                    <Checkbox
                        // checked={checked}
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <ListItemText primary={item.text} />
                    <Button style={{marginRight: 10}} variant="contained" color="primary">
                        Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => this.delete(item.key)}>
                        Delete
                    </Button>
                </ListItem>
            </List>
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