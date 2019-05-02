import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Hammer from "../icons/hammer.png";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">BeatSmith</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {this.props.state.user && localStorage.getItem("token") ? (
                <NavDropdown.Item
                  onClick={(() => window.location.reload, localStorage.clear())}
                  href="/"
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item>
                  <Link to="/login">Login</Link>
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              {this.props.state.user && !localStorage.getItem("token") ? (
                <NavDropdown.Item>
                  {" "}
                  <Link to="/signup">SignUp</Link>{" "}
                </NavDropdown.Item>
              ) : null}
            </NavDropdown>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
