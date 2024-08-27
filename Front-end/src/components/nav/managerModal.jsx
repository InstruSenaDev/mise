// SidebarModalManager.jsx
import React, { useState } from 'react';
import ModalLogout from "../modales/modalcs.jsx";
import IconLogOut from "../../images/sideBarsvg/log_out.svg";
import InfoModal from '../modales/modalinfouser.jsx';
import Modalcarga from '../modales/modalcarga/modalcarga.jsx';

const SidebarModalManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmLogout = () => {
        setIsModalOpen(false);
        // Aquí agregarías la lógica para cerrar sesión
        openSuccessModal();
        console.log("Sesión cerrada");
    };

    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            setIsSuccessModalVisible(false);
            window.location.href = "/login/login";
        }, 1000); // 1 segundos
    };

    return (
        <>
            <img
                class="h-6 w-6 relative overflow-hidden shrink-0 block cursor-pointer"
                loading="lazy"
                alt=""
                id="profile-1"
                src={IconLogOut.src}
                onClick={handleOpenModal}
            />
            <ModalLogout 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmLogout} 
            />
            <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {isSuccessModalVisible && (
                <Modalcarga />
            )}
        </>
    );
};

export default SidebarModalManager;
