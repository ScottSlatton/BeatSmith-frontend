import React from "react";
import Game from "./Game";
import "../App.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const Home = props => {
  let { experience } = props.state.user;
  return (
    <div>
      <ProgressBar
        animated
        now={experience}
        label={`Experience:${experience} `}
      />
      <div className="App-header">
        <Game state={props.state} updateExperience={props.updateExperience} />
      </div>
    </div>
  );
};

export default Home;
