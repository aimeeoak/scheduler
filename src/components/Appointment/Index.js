import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "./Status";


import useVisualMode from "hooks/useVisualMode";


import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const deletes = () => {
    transition(DELETING);
    props.deleteInterview(props.id).then(() => transition(EMPTY));
  };
  const confirming = () => {
    transition(CONFIRM);
  };
  const cancel = () => {
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Keep it secret. Keep it safe."  />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deletes}
          onCancel={cancel}
          message="Cancel your appointment?"
        />)};
    </article>
  );
};

export default Appointment;