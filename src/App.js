import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  setUser = user => {
    this.setState({ user });
  };
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" component={NavBar} />
          <Route
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />
          <Route path="/home" component={Home} />
        </React.Fragment>
      </Router>
    );
  }
}
