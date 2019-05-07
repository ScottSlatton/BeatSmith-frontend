import React from "react";
import Button from "react-bootstrap/Button";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Purchase = props => {
  return (
    <Button variant="outline-warning" onClick={() => props.buy(props.craft)}>
      {`Cost: ${props.craft.cost} Ore`}
    </Button>
  );
};

export default Purchase;
