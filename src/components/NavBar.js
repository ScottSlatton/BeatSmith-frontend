import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import Hammer from "";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home">BeatSmith</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              {this.props.state.user ? (
                <NavDropdown.Item
                  onClick={() => window.location.reload}
                  href="/home"
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              {!this.props.state.user ? (
                <NavDropdown.Item href="/signup">SignUp </NavDropdown.Item>
              ) : null}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
