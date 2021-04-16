import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


const DayListItem = (props) => {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    let spot = "";
    if (spots === 0) {
      spot = "Sorry, no spots remaining!";
    }
    if (spots === 1) {
      spot = "One spot remaining!";
    }
    if (spots >= 2) {
      spot = `${spots} spots remaining!`;
    }
    return spot; 
  };
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

export default DayListItem;