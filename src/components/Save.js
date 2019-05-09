import React from "react";
import Button from "react-bootstrap/Button";
const Save = props => {
  function saveUserState(user) {

    fetch(`https://beatsmith-api.herokuapp.com/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user })
    }).then(res => res.json());
  }

  return (
    <Button
      variant="outline-info"
      onClick={() => saveUserState(props.state.user)}
    >
      Save
    </Button>
  );
};

export default Save;
