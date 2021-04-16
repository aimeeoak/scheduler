import React, { useState } from "react";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Peregrin Took",
      interviewer: {
        id: 3,
        name: "Gandalf the Grey",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },

  {
    id: 3,
    time: "101m",
    interview: {
      student: "Aragorn, son of Arathorn",
      interviewer: {
        id: 2,
        name: "Samwise Gamgee",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },

  {
    id: 4,
    time: "6pm",
    interview: {
      student: "Bilbo Baggins",
      interviewer: {
        id: 5,
        name: "Thorin Oakenshield",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },

  {
    id: 5,
    time: "2am",
    interview: {
      student: "Frodo Baggins",
      interviewer: {
        id: 4,
        name: "Gollum",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

console.log("testApp")

const Application = (props) => {
  const [day, setDay] = useState("Monday")
  const theScheduler = appointments.map(appt => {
    return(
      <Appointment  
      key={appt.id}
      {...appt}
      />
    )
  })
  return (
    <main className="layout">
      <section className="sidebar">
      </section>
      <section className="schedule">
        {theScheduler}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

export default Application;

