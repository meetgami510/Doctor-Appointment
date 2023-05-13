import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ViewUsers = ({ show, user, onHide }) => {
  return (
    <Modal
      dialogClassName="modal-width"
      {...{ show, user, onHide }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>
            <span className="key">Name : </span>{" "}
            <span className="value">{user.firstName} {user.lastName}</span>
          </p>
          <p>
            <span className="key">Email : </span>{" "}
            <span className="value">{user.email} </span>
          </p>
          <p>
            <span className="key">Phone : </span>{" "}
            <span className="value">{user.phone} </span>
          </p>
          <p>
            <span className="key">Address : </span>{" "}
            <span className="value">{user.address} </span>
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

export default ViewUsers