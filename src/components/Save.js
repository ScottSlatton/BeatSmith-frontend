import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Save = props => {
  function saveUserState(user) {

    fetch(`https://beatsmith-api.herokuapp.com/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user })
    }).then(() => {
      const notify = () => toast("Game Saved");
      notify()
    })
  }


  return (<div>
    <Button
      variant="outline-info"
      onClick={() => saveUserState(props.state.user)}
    >
      Save
    </Button>

  </div>
  );
};

export default Save;
