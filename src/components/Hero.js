import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
// import { ToastContainer, toast } from "react-toastify";

const Hero = props => {
  const { health, name, armor, damage } = props.hero;

  const progressInstance = (
    <ProgressBar
      animated
      variant="success"
      now={health}
      label={`${health} HP`}
    />
  );
  return (
    <div>
      <h2>{`${name}`}</h2>

      <div className="health">{progressInstance}</div>
      <div className="hero" />
      <h6>{`Attack: ${damage}`} </h6>
      <h6>{`Armor: ${armor}`} </h6>
    </div>
  );
};
export default Hero;
