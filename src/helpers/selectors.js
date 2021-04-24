const getApptsByDay = (state, day) => {
  const dayObj = state.days.find((x) => x.name === day);
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
  const dayObj = state.days.find((x) => x.name === day);
  if (!dayObj) {
    return [];
  }
  const interviewers = dayObj.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
};

module.exports = { getApptsByDay, getInterview, getInterviewersByDay };