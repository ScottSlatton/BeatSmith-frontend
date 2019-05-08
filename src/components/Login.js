import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleSubmit = ev => {
    ev.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    // authenticate
    fetch("http://localhost:3000/sessions/create", {
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
      .then(res => {
        return res.json();
      })
      .then(json => {
        let user = { user: json };
        if (user.user) {
          this.props.setUser(user.user);
        } else {
          console.log(json);
          this.setState({ error: json.error });
        }
      });
    // .then(json => {
    //   if (this.props.state.user) this.props.setLoggedIn();
    // });
    // .catch(error =>
    //   this.setState({ error: { message: "Invalid Username or Password" } })
    // );
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  render() {
    if (this.props.state.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="App-header">
          {this.state.error ? (
            <div className="error">
              {" "}
              <p>{`${this.state.error}`}</p>
            </div>
          ) : null}
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
  }
}
