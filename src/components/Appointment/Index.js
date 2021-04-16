import React from "react";
import classNames from "classnames";

export function Appointment(props) {
    const itemClass = `--/${
      props.selected ? "--selected" : ""
    }`;
    return (
      <li className={itemClass} onClick={props.setItem}>
        {props.label}
      </li>
    );
    return <article className="appointment"></article>;
  }