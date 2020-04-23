import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const[tasks, setTasks] = useState([]);
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

  function renderTasksList(tasks) {
    return [{}].concat(tasks).map((task, i) => i !== 0 ? 
      (
        <LinkContainer key={task.taskId} to={`/tasks/${task.taskId}`}>
          <ListGroupItem>
            <h4>{task.content.trim().split("\n")[0]}</h4>
            {"Created: " + new Date(task.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
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