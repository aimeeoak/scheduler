import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";


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


const [days, setDays] = useState([]);

useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers"),
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
}, []);

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

