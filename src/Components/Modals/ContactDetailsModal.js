import React from 'react';
import Button from 'react-bootstrap/Button';
import { ModalWrapper } from './ModalWrapper';


export const ContactDetailsModal = (props) => {
    const {contactData, closeModal, showModal} = props;

      const getModalBody = () => {
        return (
            <>
                <p>User Email: {contactData.email}</p>
                <p>User Phone: {contactData.phone_number}</p>
            </>
        )
      }

      const getModalFooter = () => {
        return (
            <Button className="button-c" onClick={closeModal}>
              Close
            </Button>
        )
      }
    return (
      <ModalWrapper
        show={showModal}
        onHide={closeModal}
        title={"Contact Details"}
        body={getModalBody()}
        footer={getModalFooter()}
      />
    )
}