import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


// This sets the form

const Form = (props) => {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  //This resets the form after an error, in theory but not practice
  const reset = () => {
    setInterviewer(null);
    setName("");
  };
  const cancel = () => {
    reset();
    props.onCancel();
  }
  const validate = () => {
    if (name === ""){
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          /*
            This must be a controlled component
          */
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}  />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
};


export default Form;