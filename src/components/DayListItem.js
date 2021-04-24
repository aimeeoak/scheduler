import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayList = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  }
  );

  const formatSpots = function () {
    if (props.spots === 0) {
      return "No spots remaining";
    } else if (props.spots === 1) {
      return "One spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };
  
  console.log(props.name);
  return (
    <li className={dayList} onClick={() => props.setDay(props.name)} data-testid="day">
      <div className="text--regular">{props.name}</div>
      <div className="text--light">{formatSpots(props.spots)}</div>
    </li>
  );
}
