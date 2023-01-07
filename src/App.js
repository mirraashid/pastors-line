import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { MODAL_TYPES } from "./common/constants";
import { AllContactsModal } from "./Components/Modals/AllContactsModal";
import { ContactDetailsModal } from "./Components/Modals/ContactDetailsModal";

function App() {
  const navigate = useNavigate();
  const [openModalType, setOpenModalType] =  useState(null);
  const [selectedContactData, setSelectedContactData] =  useState(null);

  const closeModal = () => setOpenModalType(null);

  useEffect(() => {
    navigate('/' + (openModalType || ""));
  }, [openModalType, navigate])
 
  return (
    <div className="App">
      <header className="App-header">
       { 
        (openModalType === MODAL_TYPES.MODAL_A || openModalType === MODAL_TYPES.MODAL_B ) && <AllContactsModal
            openModalType={openModalType}
            closeModal={closeModal}
            setOpenModalType={setOpenModalType}
            setSelectedContactData={setSelectedContactData}
          />
       }
      { 
        selectedContactData && <ContactDetailsModal
            showModal={true}
            closeModal={()=>setSelectedContactData(null)}
            contactData={selectedContactData}
          />
        }
       <div>
        <Button className="m-1" variant="button-a" onClick={() => setOpenModalType(MODAL_TYPES.MODAL_A)}>Button A </Button>
        <Button className="m-1" variant="button-b" onClick={() => setOpenModalType(MODAL_TYPES.MODAL_B)}>Button B </Button>
       </div>
      </header>
    </div>
  );
}

export default App;
