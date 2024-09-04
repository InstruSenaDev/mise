import React from 'react';

const ConfirmModal = ({ isOpen, closeModal, handleConfirm }) => {

    const openModal = () => setIsOpen(true);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-90">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-xl font-semibold text-black">¿Quieres hacer esto?</p>
                        <p className="text-black mt-2">Solo queremos estar seguros...</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={closeModal} className="px-4 py-2 text-black border bg-transparent border-black rounded-md">
                                No, cancelar
                            </button>
                            <button type="submit" onClick={handleConfirm} className="px-4 py-2 bg-principalGreen text-white rounded-md">
                                Sí, Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmModal;
