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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  //function to book the interviews

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {
            ...interview
          }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({ ...state, appointments, days });
      })
  }

  //function to delete the interviews

  function deleteInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({ ...state, appointments, days })
      });
  };

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

  //function to update spots on sidebar

  const getSpotsForDay = function (dayObj, appointments) {

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  const updateSpots = function (dayName, days, appointments) {
    const dayObj = days.find(x => x.name === dayName);
    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = {
      ...dayObj,
      spots
    };

    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays;
  };
  return { state, updateSpots, setDay, bookInterview, deleteInterview };
};