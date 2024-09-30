import React from 'react';
import './modalcarga.css';

const ModalInformativo = ({ mensaje, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="mb-4 text-gray-700">{mensaje}</p>
                <button 
                    className="bg-principalGreen text-white py-2 px-4 rounded hover:bg-white hover:text-principalGreen focus:outline-none"
                    onClick={onClose}
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default ModalInformativo;