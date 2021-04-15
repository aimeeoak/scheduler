import React from "react";
import classNames from "classnames";

export default function DayListItem(props) {
    const dayClass = classNames(
      'day-list__item', {
      'day-list__item--selected': props.selected,
      'day-list__item--full': !props.spots,
    })
const formatSpots = (spots) => {
    if (spots === 0) return "No spots left";
    if (spots === 1) return "One spot left!";
    return `${spots} remaining`;
};
return(
<></>
  );
};