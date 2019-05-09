import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Hammer from "../icons/hammer.png";

export default class NavBar extends Component {
  render() {
    const { isLoggedIn } = this.props.state;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand href="#home">
            <img
              src="/hammer-drop.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="BeatSmith Logo"
            />
            {" BeatSmith"}
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {isLoggedIn ? (
                <NavDropdown.Item onClick={() => this.props.resetState()}>
                  Logout
                </NavDropdown.Item>
              ) : (
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                )}
              <NavDropdown.Divider />
              {!isLoggedIn ? (
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              ) : null}
            </NavDropdown>
            <Navbar.Text>
              Level: {`${this.props.state.user.level}`}
            </Navbar.Text>
            <Nav.Link href="/rules">How To Play</Nav.Link>
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
