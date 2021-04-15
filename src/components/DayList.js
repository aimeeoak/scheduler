import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props){
  const days = props.days;

  const handleDayList = days.map(day => 
  <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots} 
    selected={props.day}
    setDay={props.setDay}
    />);
  return (
  <ul>
    { handleDayList }
    <DayList days={days} day={props.day} setDay={props.setDay} />
  </ul>
  )
}