import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Boss = props => {
  const { health, name, armor, damage } = props.boss;
  const progressInstance = (
    <ProgressBar
      animated
      variant="danger"
      now={health}
      label={`${health} HP`}
    />
  );
  return (
    <div className="boss-container">
      <h2>{name}</h2>
      <div className="health">{progressInstance}</div>
      <div className="boss" onClick={ev => props.clickDamage(ev)} />
      <h6>{`Attack: ${damage}`} </h6>
      <h6>{`Armor: ${armor}`} </h6>
    </div>
  );
};

export default Boss;
