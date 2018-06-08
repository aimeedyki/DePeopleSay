import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './CommonModal.css';

const commonModal = props => (
  <Modal
    dialogClassName={`common-modal ${props.customClass}`}
    onHide={props.close}
    show={props.show}
  >
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.content}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.ctAction}>{props.ctaTitle}</Button>
    </Modal.Footer>
  </Modal>
);

export default commonModal;
