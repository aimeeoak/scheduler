import React from "react";

//components

import DayList from "components/DayList.js";
import Appointment from "components/Appointment/Index";

//helpers

import { getApptsByDay, getInterview, getInterviewersByDay } from "../helpers/selectors";

//hooks

import useAppData from "../hooks/useApplicationData";

//styling

import "components/Application.scss";

const Application = (props) => {
  const { state, setDay, updateSpots, bookInterview, deleteInterview } = useAppData();

  const dailyAppts = getApptsByDay(state, state.day);

  const interviewers = getInterviewersByDay(state, state.day);

  const superSchedule = dailyAppts.map((appt) => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
        key={appt.id}
        {...appt}
        time={appt.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay}
          updateSpots={updateSpots} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {superSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  )
};

export default Application;