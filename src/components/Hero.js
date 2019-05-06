import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ToastContainer, toast } from "react-toastify";

const Hero = props => {
  const { health, armor, damage, name } = props.hero;

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
      <p>{`${name}`}</p>

      <div className="health">{progressInstance}</div>
      <div className="hero" />
    </div>
  );
};
export default Hero;
