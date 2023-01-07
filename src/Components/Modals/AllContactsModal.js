import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import { MODAL_TYPES, MODAL_CONFIG } from "../../common/constants";
import { fetchContacts } from "../../common/apiContainer";
import { InputWithDebounce } from "../../common/InputWithDebounce";
import { ModalWrapper } from './ModalWrapper';

export const AllContactsModal = (props) => {
    const {openModalType, closeModal, setOpenModalType, setSelectedContactData} = props;
    const [isOnlyEvenFilterActive, setIsOnlyEvenFilterActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    

    //we can use useAsync library to handle loading, error and response.
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] =  useState(false);
    const [contactData, setContactData] = useState({});
   

    const handleEvenFilterChange = () => {
        setIsOnlyEvenFilterActive(!isOnlyEvenFilterActive);
      };
    
      const Checkbox = ({ label, value, onChange }) => {
        return (
          <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
          </label>
        );
      };

    async function fetchUserData({paramData, persistPrevData=false}) {
        const defaultParams = {
            companyId: 171,
        };

        try {
            setIsLoading(true);
            setIsError(false)
            const response = await fetchContacts({...paramData, ...defaultParams});
            if (response.status !== 200) return Promise.reject(new Error());
            persistPrevData ? setContactData(...contactData, ...response.data?.contacts) : setContactData(response.data?.contacts)
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setIsError(true);
            return Promise.reject(new Error(e));
        }
    }

    useEffect(() => {
        const paramData = {
          page: 1,
          ...(openModalType === MODAL_TYPES.MODAL_B && {countryId: 226}),
          ...(searchQuery && {query: searchQuery})
        };

        fetchUserData({paramData});
  
      }, [searchQuery, openModalType]);

      const getModalBody = (modalType) => {
        return (
            <>
                <InputWithDebounce callBack={setSearchQuery} />
                {
                    isLoading ? <h4>Loading data...</h4> : isError ? <h4>Something went wrong..</h4> : (
                        <>
                            <div className="contact-list-wrapper">
                                <ul>
                                    {
                                        Object.keys(contactData).filter((contactId) => isOnlyEvenFilterActive ? contactId%2 === 0 : true).map(contactId => {
                                            return (<li key={contactId} onClick={() => setSelectedContactData(contactData[contactId])}>{contactData[contactId]?.email || contactData[contactId]?.phone_number}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                )}
            </>
        )
      }

      const getModalFooter = () => {
        return (
            !isLoading && !isError && <>
                <Button variant="button-a" onClick={() => setOpenModalType(MODAL_TYPES.MODAL_A)}>
                All Contacts
                </Button>
                <Button variant="button-b" onClick={() => setOpenModalType(MODAL_TYPES.MODAL_B)}>
                US Contacts
                </Button>
                <Button variant="button-c" onClick={closeModal}>
                Close
                </Button>
                <Checkbox
                label=" Only even"
                value={isOnlyEvenFilterActive}
                onChange={handleEvenFilterChange}
                />
            </>
        )
      }


    return (
        <ModalWrapper
            show={openModalType}
            onHide={closeModal}
            title={MODAL_CONFIG[openModalType]?.heading}
            body={getModalBody()}
            footer={getModalFooter()}
        />
    )
}