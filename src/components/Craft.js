import React from "react";
// import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Purchase from "./Purchase";

const Craft = props => {
  const { name } = props.craft;
  return (
    <div>
      <Button variant="outline-info" disabled>{`${name}`}</Button>
      <Purchase craft={props.craft} buy={props.buy} />
    </div>
  );
};
export default Craft;
