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
    return
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  }