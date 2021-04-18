import React from "react";

export function getAppointmentsForDay(state, day) {
    const getApptsByDay = (state, day) => {
        const dayObj = state.days.find((x) => x.name === day);
        if (!dayObj) {
          return [];
        }
        const appts = dayObj.appointments.map((id) => state.appointments[id]);
        return appts;
      };
  }