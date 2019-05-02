import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Hero = props => {
  const { health, armor, damage } = props.hero;

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
      <p>Hero</p>
      <div className="health">{progressInstance}</div>
      <div className="hero" />
    </div>
  );
};
export default Hero;
