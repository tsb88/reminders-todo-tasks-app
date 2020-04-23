import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewTask from "./containers/NewTask/NewTask";
import Tasks from "./containers/Tasks/Tasks";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/tasks/new">
        <NewTask />
      </Route>
      <Route exact path="/tasks/:id">
        <Tasks />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}