import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleSubmit(ev) {
    ev.preventDefault();
    // authenticate
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <input
            onChange={ev => this.handleChange(ev)}
            type="text"
            placeholder="username"
            value={this.state.username}
            name="username"
          />
          <input
            onChange={ev => this.handleChange(ev)}
            type="password"
            placeholder="password"
            value={this.state.password}
            name="password"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
