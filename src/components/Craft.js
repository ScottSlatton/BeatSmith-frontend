import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Purchase from "./Purchase";

const Craft = props => {
  const { name, armor, damage, cost } = props.craft;
  return (
    <div>
      <Button variant="outline-info">{`${name}`}</Button>
      <Purchase craft={props.craft} buy={props.buy}>
        {" "}
        Buy{" "}
      </Purchase>
    </div>
  );
};
export default Craft;
