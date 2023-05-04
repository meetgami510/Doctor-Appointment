import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/Showdetails.css"

const ShowDetails = (props) => {
    console.log(props.data);
  return (
    <Modal
    dialogClassName="modal-width"
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Details of User {props.data.user.firstName}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <p>
          <span className="key">User Name : </span>{" "}
          <span className="value">{props.data.user.firstName +" "+ props.data.user.lastName} </span>
        </p>
        <p>
          <span className="key">Feeling :</span>{" "}
          <span className="value">{props.data.feel} </span>
        </p>
        <p>
          <span className="key">Time :</span>{" "}
          <span className="value">{props.data.time} </span>
        </p>
        <p>
          <span className="key">Phone No :</span>{" "}
          <span className="value">{props.data.user.phone} </span>
        </p>
        <p>
          <span className="key">Status :</span>{" "}
          <span className="value">{props.data.status} </span>
        </p>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      {/* <Button
        variant="primary"
        onClick={(e) => {
          e.preventDefault();
          props.onHide();
        }}
      >
        Save Changes
      </Button> */}
    </Modal.Footer>
  </Modal>
  )
}

export default ShowDetails