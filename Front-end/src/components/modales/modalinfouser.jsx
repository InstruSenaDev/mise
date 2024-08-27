import React from 'react';
import IconProfile from "../../images/sideBarImg/avatar@2x.png";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-greyBlack bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-greyBg rounded-lg shadow-lg w-96 p-6 relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute h-4 w-4 top-2 right-2 text-white"
        >
          &times;
        </button>

        <div className="flex items-center">
          {/* Imagen de perfil */}
          <img
            src={IconProfile.src}
            alt="Perfil"
            className="rounded-full h-16 w-16 object-cover"
          />

          <div className="ml-4">
            {/* Nombre */}
            <h2 className="text-lg font-semibold text-white">Brian Marin</h2>

            {/* Título */}
            <p className="text-sm font-semibold text-white">Coordinador</p>

            {/* Correo electrónico */}
            <p className="text-sm text-white">
              <i className="far fa-envelope mr-2"></i>
              brianmarin@prueba.com
            </p>

            {/* Teléfonos */}
            <p className="text-sm text-white">
              <i className="fas fa-phone mr-2"></i>
              3156352578
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
