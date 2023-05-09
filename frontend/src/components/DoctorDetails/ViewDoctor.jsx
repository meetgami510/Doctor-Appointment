import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ViewDoctor = ({ show, doctor, onHide }) => {
  return (
    <Modal
      dialogClassName="modal-width"
      {...{ show, doctor, onHide }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Doctor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>
            <span className="key">Name : </span>{" "}
            <span className="value">{doctor.user.firstName} {doctor.user.lastName}</span>
          </p>
          <p>
            <span className="key">Experience</span>{" "}
            <span className="value">{doctor.experience} </span>
          </p>
          <p>
            <span className="key">Specialization : </span>{" "}
            <span className="value">{doctor.specialization} </span>
          </p>
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

export default ViewDoctor