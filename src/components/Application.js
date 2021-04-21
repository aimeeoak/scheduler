import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment/Index";


import { getApptsByDay, getInt, getIntsByDay } from "helpers/selectors";


const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    console.log("application.js", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log(id, interview);
    return axios.put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      console.log("what's wrong with u", response)
      if (response.status === 204) {
        setState({
          ...state,
          appointments
        })
        console.log("success");
      }
    })
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`, {})
    .then(response => {
      if(response.status === 204) {
        setState({
          ...state,
          appointments
        });
      }
      console.log("Delete", response)
    })
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  
  const dailyAppts = getApptsByDay(state, state.day);
  console.log(dailyAppts);

  const setDay = day => setState({ ...state, day });

  const interviewers = getIntsByDay(state, state.day)

  const schedule = dailyAppts.map(appt => {
    const interview = getInt(state, appt.interview)
    return (
      <Appointment
        {...appt}
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

export default Application;



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Peregrin Took",
//       interviewer: {
//         id: 3,
//         name: "Gandalf the Grey",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },

//   {
//     id: 3,
//     time: "101m",
//     interview: {
//       student: "Aragorn, son of Arathorn",
//       interviewer: {
//         id: 2,
//         name: "Samwise Gamgee",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },

//   {
//     id: 4,
//     time: "6pm",
//     interview: {
//       student: "Bilbo Baggins",
//       interviewer: {
//         id: 5,
//         name: "Thorin Oakenshield",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },

//   {
//     id: 5,
//     time: "2am",
//     interview: {
//       student: "Frodo Baggins",
//       interviewer: {
//         id: 4,
//         name: "Gollum",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];
