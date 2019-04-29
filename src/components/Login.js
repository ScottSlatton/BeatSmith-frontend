import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.textInput = React.createRef();
  }
  handleSubmit = ev => {
    ev.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    // authenticate
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(r => r.json())
      .then(json => {
        localStorage.setItem("token", json.jwt);
        return json;
      })
      .then(json => this.props.setUser(json.user));
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter Username"
              onChange={ev => this.handleChange(ev)}
              ref={this.textInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={ev => this.handleChange(ev)}
              ref={this.textInput}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="I am at least 13 years of age."
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
