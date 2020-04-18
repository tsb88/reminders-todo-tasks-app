import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";

function App() {
    return (
        <div className="App container">
          <Navbar bg="light" fluid="true" collapseOnSelect>
              <Navbar.Brand>
                <Link to="/">Tasks/To-do</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
      );
  }

export default App;