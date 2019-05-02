import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Boss = props => {
  const { health } = props.boss;
  const { name } = props.boss;
  const progressInstance = (
    <ProgressBar
      animated
      variant="danger"
      now={health}
      label={`${health} HP`}
    />
  );
  return (
    <div>
      <div className="health">{progressInstance}</div>
      <div className="boss" onClick={() => props.takeDamage()} />
      <p>{name}</p>
    </div>
  );
};

export default Boss;
