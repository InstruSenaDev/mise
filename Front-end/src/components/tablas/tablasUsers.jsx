import React, { useEffect, useState } from 'react';
import InfoUser from './infoUser';
import Buscador from '../inputs/buscador/buscador';

const UserTable = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v2/usuario/');
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.log('Error al obtener los usuarios:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v2/rol/');
                const data = await response.json();
                setRoles(data);
            } catch (error) {
                console.log('Error al obtener los roles:', error);
            }
        };

        fetchUsuarios();
        fetchRoles();
    }, []);

    const roleMap = new Map(roles.map(role => [role.id_rol, role.descripcion]));

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            <div className='flex flex-row w-full'>
                <Buscador onSearch={handleSearch} />
                <div className='w-full py-5 flex items-center justify-end'>
                    <a href="/nuevoUser/nuevoUser">
                        <button className='bg-principalGreen rounded-xl p-2 text-white hover:bg-white hover:text-principalGreen'>
                            Nuevo Usuario
                        </button>
                    </a>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[40rem] custom-scrollbar w-full justify-center rounded-b-xl">
                <div className="bg-greyBlack border-textBg rounded-t-xl text-white flex">
                    <div className="flex-1 p-5 text-left">Nombre</div>
                    <div className="flex-1 p-5 text-center">MISE encargado</div>
                    <div className="flex-1 p-5 text-center">Rol</div>
                    <div className="flex-1 p-5 text-center"></div> {/* Nueva columna para el botón */}
                </div>
                <div className="overflow-auto divide-y border border-textBg border-t-0 rounded">
                    {usuarios
                        .filter(usuario => `${usuario.nombres} ${usuario.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(usuario => (
                            <InfoUser
                                key={usuario.id_usuario}
                                nombre={`${usuario.nombres} ${usuario.apellidos}`}
                                MISE={usuario.programa}
                                dataRol={roleMap.get(usuario.id_rol)}
                                id_usuario={usuario.id_usuario}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default UserTable;
