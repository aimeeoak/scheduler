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
  const { state, setDay, bookInt, deleteInt } = useAppData();

  const dailyAppts = getApptsByDay(state, state.day);

  const interviewers = getInterviewersByDay(state, state.day);

  const superSchedule = dailyAppts.map((appt) => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
        {...appt}
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInt}
        deleteInterview={deleteInt}
      />
    );
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
  );
};

export default Application;