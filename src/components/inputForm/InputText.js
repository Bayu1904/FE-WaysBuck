import React from "react";
import Form from "react-bootstrap/Form";

export default function InputText(props) {
  return (
    <div className="mt-3">
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
