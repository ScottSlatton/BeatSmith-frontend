import React from "react";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" component={NavBar} />
        </React.Fragment>
      </Router>
    );
  }
}
