import React, { useState } from 'react';
import ConfirmModal from '../../components/modales/modalconfirm';
import Modalcarga from '../../components/modales/modalcarga/modalcarga';
import CancelModal from "../../components/modales/modalcancel";


const InfoAE = ({ nit, nombre_empresa, representante, razon_social }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCOpen, setIsCOpen] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const closeModal = () => setIsOpen(false);
  const closeCModal = () => setIsCOpen(false);
  const openModal = () => setIsOpen(true);
  const openCModal = () => setIsCOpen(true);

  const handleConfirm = () => {
    fetch(`http://localhost:8000/api/v2/update-empresa-status/${nit}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: 2 }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al actualizar el estado');
      })
      .then(data => {
        console.log(data);
        openSuccessModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    closeModal();
  };

  const handleCancel = () => {
    openSuccessModal();
    closeCModal();
  };

  const openSuccessModal = () => {
    setIsSuccessModalVisible(true);
    setTimeout(() => {
      setIsSuccessModalVisible(false);
      location.reload();
    }, 1000);
  };

  const handleViewCompany = () => {
    history.push(`/aceptarEmpresas/verinfoempresa/${nit}`);
  };

  return (
    <>
      <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleConfirm} />
      <CancelModal isCOpen={isCOpen} closeCModal={closeCModal} handleCancel={handleCancel} />

      <div className="flex justify-between items-center bg-transparent border-transparent">
        <div className="p-5 flex-1 text-white whitespace-nowrap">
          {nombre_empresa}
        </div>
        <div className="p-5 flex-1 text-white whitespace-nowrap">
          {representante}
        </div>
        <div className="p-5 flex-1 text-lg text-white whitespace-nowrap">
          {razon_social}
        </div>
        <div className="p-5 flex-1">
          <a href="/aceptarEmpresas/verinfoempresa">
            <a href={`/aceptarEmpresas/verinfoempresa/${nit}`}>
              <button
                onClick={handleViewCompany}
                className="p-4  tracking-wide text-lg transition-colors duration-200 bg-transparent transform border-solid rounded-lg hover:bg-principalGreen hover:text-white hover:border-solid border hover:border-principalGreen"
              >
                Ver Empresa
              </button>
            </a>
          </a>
        </div>
        <div className="p-5 flex-1">
          <button onClick={openModal} className="p-4 tracking-wide text-xl transition-colors duration-200 bg-principalGreen border-solid rounded-tl-lg rounded-bl-lg hover:text-principalGreen hover:bg-white">
            <i className="fa-solid fa-check"></i>
          </button>
          <button onClick={openCModal} className="p-4 tracking-wide text-xl transition-colors duration-200 bg-red border-solid rounded-br-lg rounded-tr-lg hover:text-red hover:bg-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      {isSuccessModalVisible && (
        <Modalcarga />
      )}
    </>
  );
};

export default InfoAE;
