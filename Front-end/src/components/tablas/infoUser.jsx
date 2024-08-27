import React from 'react';

const InfoUser = ({ nombre, MISE, dataRol, id_usuario }) => {

    const userClassName = nombre.toLowerCase();

    const handleEditClick = () => {
        // Redirigir a la página de edición del usuario con el id_usuario
        window.location.href = `/editarUsuario/editarUsuario`;
    };

    return (
        <div className={`${userClassName} bg-transparent border-transparent flex`}>
            <div className="flex-1 p-5 py-8 text-sm whitespace-nowrap">
                <p className="text-white w-[8rem]">
                    {nombre}
                </p>
            </div>
            <div className="flex-1 p-5 py-8 text-sm text-center text-white whitespace-nowrap">
                {MISE}
            </div>
            <div className="flex-1 p-5 py-8 text-sm text-center text-white whitespace-nowrap border-b-0 border-b-transparent">
                
                    {dataRol}
                
            </div>
            <div className="flex-1 p-5  text-sm text-right whitespace-nowrap border-b-0 border-b-transparent">
                <button
                    className="bg-principalGreen text-white rounded-lg px-4 py-2 hover:bg-white hover:text-principalGreen"
                    onClick={handleEditClick}
                >
                    Editar Usuario
                </button>
            </div>
        </div>
    );
};

export default InfoUser;
