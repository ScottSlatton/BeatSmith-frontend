import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";

const Craft = props => {
  const { name, armor, damage, cost } = props.craft;
  return (
    <div>
      <Button>{`${name}`}</Button>
      <Button>{`${cost}`}</Button>
    </div>
  );
};
export default Craft;
