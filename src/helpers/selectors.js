const getApptsByDay = (state, day) => {
  const dayObj = state.days.find((dayIterable) => dayIterable.name === day);
  if (!dayObj) {
    return [];
  }
  const appts = dayObj.appointments.map((id) => state.appointments[id]);
  return appts;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const intObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return intObj;
};

const getInterviewersByDay = (state, day) => {
  const dayObj = state.days.find((dayIterable) => dayIterable.name === day);
  if (!dayObj) {
    return [];
  }
  const interviewers = dayObj.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
};

const getDay = (state, day) => state.days.find((dayIterable) => dayIterable.name === day);

const getAllDays = (state) => state.days;

module.exports = { getApptsByDay, getInterview, getInterviewersByDay, getDay, getAllDays };