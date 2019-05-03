import React, { Component } from "react";
import Craft from "./Craft";

const CraftContainer = props => {
  return (
    <div>
      {props.crafts.map(craft => {
        return <Craft craft={craft} buy={props.buy} />;
      })}
    </div>
  );
};

export default CraftContainer;
