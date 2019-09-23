import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './CommonModal.css';

const commonModal = props => (
  <Modal
    dialogClassName={`common-modal ${props.customClass}`}
    onHide={props.close}
    show={props.show}
    style={{ opacity: 1 }}
    centered
  >
    <Modal.Header className="common-modal-header" closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.content}
    </Modal.Body>
    <Modal.Footer>
      <Button
        className="cta-button"
        onClick={props.ctAction}
      >
        {props.ctaTitle}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default commonModal;
