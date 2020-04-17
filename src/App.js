import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Nav, Navbar, NavItem } from "react-bootstrap";
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
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
      );
  }

export default App;