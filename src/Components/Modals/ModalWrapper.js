import React from 'react';
import Modal from 'react-bootstrap/Modal';

export const ModalWrapper = (props) => {
    const {title, body, footer, show, onClose} = props;
    return (
        <Modal centered show={show} onHide={onClose}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          { body && (
           <Modal.Body>
              {body}
            </Modal.Body>
          )}
          { footer && (
           <Modal.Footer>
              {footer}
            </Modal.Footer>
          )}
        </Modal>
    )
}