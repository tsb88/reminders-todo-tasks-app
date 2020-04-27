import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewTask from "./containers/NewTask/NewTask";
import Tasks from "./containers/Tasks/Tasks";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/tasks/new">
        <NewTask />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/tasks/:id">
        <Tasks />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}