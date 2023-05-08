import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/Showdetails.css"

const ShowDetails = ({ show, appointment, isDoctor, onHide, appointmentStatus }) => {

  var person = {};
  console.log(isDoctor)
  if (isDoctor) person = appointment.user;
  else person = appointment.doctor.user;
  console.log(appointment)
  return (
    <Modal
      dialogClassName="modal-width"
      {...{ show, appointment, isDoctor, onHide }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Details of {isDoctor ? "patient :- " : "Doctor :- "} {person.firstName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>
            <span className="key">{isDoctor ? "Patient" : "Doctor"} Name : </span>{" "}
            <span className="value">{person.firstName + " " + person.lastName} </span>
          </p>
          <p>
            <span className="key">{isDoctor ? "Feeling" : "Your Feeling"} :</span>{" "}
            <span className="value">{appointment.feel} </span>
          </p>
          <p>
            <span className="key">Time :</span>{" "}
            <span className="value">{appointment.time} </span>
          </p>
          <p>
            <span className="key">Phone No :</span>{" "}
            <span className="value">{person.phone} </span>
          </p>
          <p>
            <span className="key">Status :</span>{" "}
            <span className="value">{appointmentStatus} </span>
          </p>
          {
            "approved" === appointmentStatus && "online" === appointment.meetingMode &&
            <>
              <span className="key">Meeting Link :</span>
              <a href={appointment.meetingLink} alt="#" target="_blank" rel="noopener noreferrer"> join Meeting</a>
            </>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShowDetails