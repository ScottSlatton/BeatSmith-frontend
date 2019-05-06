import React, { Component } from "react";
import Craft from "./Craft";

const CraftContainer = props => {
  let key = 1; //craft.id
  return (
    <div>
      {props.crafts.map(craft => {
        key++;
        return <Craft key={key} craft={craft} buy={props.buy} />;
      })}
    </div>
  );
};

export default CraftContainer;
