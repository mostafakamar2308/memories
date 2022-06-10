import React from "react";

export function Modal(props) {
  const [visible, setVisible] = React.useState(true);
  return (
    visible && (
      <div className="modal">
        <h1>props.msg</h1>
        <button onClick={() => setVisible(!visible)}>OK</button>
      </div>
    )
  );
}
