import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { s3Delete } from "../../libs/awsLib";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const tasks = await loadTasks();
        setTasks(tasks);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function loadTasks() {
    return API.get("tasks", "/tasks");
  }

  async function deleteTask(task, i) {
    console.log("Task deleted: " + task.taskId);

    const confirmed = window.confirm(
        "Are you sure you want to complete this task? The task and it's attachment will be deleted."
    );

    if (!confirmed) {
        return;
    }

    setIsLoading(true);
    try {
        await s3Delete(task.content.attachment);
        await API.del("tasks", `/tasks/${task.taskId}`);
        console.log(tasks);
        let newTasks = tasks.filter(task2 => task2.taskId !== task.taskId);
        console.log(newTasks);
        setTasks(newTasks);
    } catch (e) {
        onError(e);
    }
    setIsLoading(false);
    
  }

  function renderTasksList(tasks) {
    return [{}].concat(tasks).map((task, i) => i !== 0 ? 
      (
          <ListGroupItem key={task.taskId}>
            <Button size="sm" variant="success" className="float-right" onClick={() => deleteTask(task, i)}>Complete</Button>
            <h4>{task.content.trim().split("\n")[0]}</h4>
            {"Created: " + new Date(task.createdAt).toLocaleString()}
            <NavLink to={`/tasks/${task.taskId}`}>
              <Button size="sm" variant="primary" className="float-right">Edit</Button>
            </NavLink>
          </ListGroupItem>
      ) : (
        <LinkContainer key="new" to="/tasks/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"} Create a new task </b>
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Tasks/To-Do</h1>
        <p>A simple task management app</p>
      </div>
    );
  }

  function renderTasks() {
    return (
      <div>
        <h1 className="tasks">Your Tasks</h1>
        <ListGroup>
          {!isLoading && renderTasksList(tasks)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderTasks() : renderLander()}
    </div>
  );
}