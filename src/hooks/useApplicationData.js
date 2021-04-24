import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(){

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
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

  const setDay = day => setState({
    ...state,
    day
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  // using Devin's because mine kept failing

  const newSpotDayObj = (dayName, days, appointments) => {
    const dayToUpdate = days.find(day => day.name === dayName);
    let spotCount = 0;
    for (let app in appointments) {
      if (appointments[app].interview === null && dayToUpdate.appointments.includes(appointments[app].id)) {
        spotCount++
      }
    }
    return { ...dayToUpdate, spots: spotCount };
  };

  const newDaysArr = (dayObj, daysArr) => {
    return daysArr.map((day) => (day.name === dayObj.name ? dayObj : day));
  };

  return { state, setDay, bookInterview, deleteInterview };
};