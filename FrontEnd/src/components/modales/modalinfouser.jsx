import React, { useEffect, useState } from 'react';
import IconProfile from "../../images/sideBarImg/avatar@2x.png";

const InfoModal = ({ isOpen, onClose }) => {
   const [userData, setUserData] = useState({ nombre: '', rol: '', correo: '', telefono: '222222'  });

    useEffect(() => {
        // Obtiene los datos del usuario almacenados en localStorage después del login
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (storedUserData) {
            setUserData({
                nombre: storedUserData.nombres,
                rol: storedUserData.id_rol,
                correo: storedUserData.correo
                  // Cambia 'rol' por 'id_rol' si así lo guardaste
            });
        }
    }, []);

    const getRolName = (idRol) => {
        switch(idRol) {
            case 1:
                return 'SuperAdmin';
            case 2:
                return 'Coordinador';
            case 3:
                return 'Pasante';
            default:
                return 'Desconocido'; // Por si el id_rol no es 1, 2 o 3
        }
    };

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
                        src={IconProfile}
                        alt="Perfil"
                        className="rounded-full h-16 w-16 object-cover"
                    />

                    <div className="ml-4">
                        {/* Nombre */}
                        <h2 className="text-lg font-semibold text-white">{userData.nombre}</h2>

                        {/* Título */}
                        <p className="text-sm font-semibold text-white">{getRolName(userData.rol)}</p>

                        {/* Correo electrónico */}
                        <p className="text-sm text-white">
                            <i className="far fa-envelope mr-2"></i>
                            {userData.correo}
                        </p>

                        {/* Teléfonos */}
                        <p className="text-sm text-white">
                            <i className="fas fa-phone mr-2"></i>
                            {userData.telefono}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
