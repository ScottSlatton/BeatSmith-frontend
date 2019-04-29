import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  render() {
    return <div>Welcome to my App!</div>;
  }
}
