import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Boss = props => {
  const { health, name } = props.boss;
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
      <p>{name}</p>
      <div className="health">{progressInstance}</div>
      <div className="boss" onClick={ev => props.clickDamage(ev)} />
    </div>
  );
};

export default Boss;
