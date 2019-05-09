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
    this.setState({ ...this.state, user: user, isLoggedIn: true });
  };

  // setLoggedIn = () => {
  //   this.setState({ ...this.state });
  // };

  autoSave = (bossExperience, userOre, userClick) => {
    let updatedExperience = this.state.user.experience + bossExperience;
    if (updatedExperience > 100) {
      this.levelUp()
      updatedExperience = 0
    }
    let updatedClickStrength = this.state.user.click_strength + userClick
    this.setState({
      user: {
        ...this.state.user,
        experience: updatedExperience,
        ore: userOre,
        click_strength: updatedClickStrength
      }
    });
    this.sendAutoSave(updatedExperience, userOre, updatedClickStrength);
  };
  levelUp = () => {
    this.setState({ ...this.state, user: { level: this.state.user + 1, experience: 0 } })
  }

  sendAutoSave = (userExp, userOre, userClick) => {
    let token = localStorage.getItem("token");
    fetch(`https://beatsmith-api.herokuapp.com/api/v1/users/${this.state.user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          experience: userExp,
          ore: userOre,
          click_strength: userClick
        }
      })
    })
      .then(r => r.json())

  };

  resetState = () => {
    window.location.reload();
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar
                {...props}
                resetState={this.resetState}
                state={this.state}
              />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login {...props} state={this.state} setUser={this.setUser} />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <SignUp {...props} state={this.state} setUser={this.setUser} />
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
                autoSave={this.autoSave}
              />
            )}
          />
        </React.Fragment>
      </Router>
    );
  }
}
