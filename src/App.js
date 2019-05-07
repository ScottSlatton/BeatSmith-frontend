import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoggedIn: false, user: { experience: 0, level: 1 } };
  }
  setUser = user => {
    this.setState({ user });
  };

  setLoggedIn = () => {
    this.setState({ isLoggedIn: true });
  };

  updateExperience = bossExperience => {
    this.setState({
      user: {
        ...this.state.user,
        experience: this.state.user.experience + bossExperience
      }
    });
    this.sendExperience();
  };

  sendExperience = userExp => {};

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar
                {...props}
                state={this.state}
                setLoggedIn={this.setLoggedIn}
              />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                state={this.state}
                setUser={this.setUser}
                setLoggedIn={this.setLoggedIn}
              />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                state={this.state}
                setUser={this.setUser}
                setLoggedIn={this.setLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                state={this.state}
                setUser={this.setUser}
                setLoggedIn={this.setLoggedIn}
                updateExperience={this.updateExperience}
              />
            )}
          />
        </React.Fragment>
      </Router>
    );
  }
}
