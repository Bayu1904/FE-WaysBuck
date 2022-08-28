import React from "react";
import Button from "react-bootstrap/Button";

export default function ButtonSubmit(props) {
  return (
    <div className="pt-4">
      <div className="text-center">
        <Button
          variant="danger"
          className="w-75 py-1"
          type="submit"
          onClick={props.onClick}
        >
          {props.text}
        </Button>
      </div>
    </div>
  );
}
