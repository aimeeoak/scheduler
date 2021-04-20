import React from "react";
//components

import Header from "components/Appointment/Header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

//hooks

import useVisualMode from "hooks/useVisualMode";

//helpers

//styling

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} />
      )}
    </article>
  );
};

export default Appointment;