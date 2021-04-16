import React from "react";
import classNames from "classnames";

import "components/InterviewerList.scss";

export function ListItem(props) {
  const itemClass = `list__item${
    props.selected ? "list__item--selected" : ""
  }`;
  return (
    <li className={itemClass} onClick={props.setItem}>
      {props.label}
    </li>
  );
}

export function List(props) {
  const items = props.item.map(item => (
    <ListItem
    key={item.id}
    labal={item.label}
    selected={item.id === props.item}
    setItem={(event) => props.setItem(item.id)}

    />
  ));
  return <ul>{items}</ul>;
}