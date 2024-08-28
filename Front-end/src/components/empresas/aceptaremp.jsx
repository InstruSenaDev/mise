import React, { useState, useEffect } from 'react';
import { Infopostu } from '../../helpers/infopostu';
import { Infoemp } from '../../helpers/infoemp';
import ConfirmModal from '../modales/modalconfirm';
import Modalcarga from '../modales/modalcarga/modalcarga';
import CancelModal from "../modales/modalcancel";
import { Autoeva } from '../../helpers/autoeva';
import { useParams } from 'react-router-dom';

const DeveloperPortal = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [isOpen, setIsOpen] = useState(false);
    const [isCOpen, setIsCOpen] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const closeModal = () => setIsOpen(false);
    const closeCModal = () => setIsCOpen(false);
    const openModal = () => setIsOpen(true);
    const openCModal = () => setIsCOpen(true);

    const [loading, setLoading] = useState(true);

    const { nit } = useParams(); // Obtener el nit desde la URL
    const [empresa, setEmpresaData] = useState(null);

    useEffect(() => {
        // Construye la URL correcta para hacer la solicitud
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v2/empresas/${nit}/`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la empresa');
                }
                const data = await response.json();
                setEmpresaData(data);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, [nit]);

    if (!companyData) {
        return <div>Cargando...</div>;
    }


    const handleCancel = () => {
        openSuccessModal();
        closeCModal();
    };

    const handleConfirm = () => {
        openSuccessModal();
        closeModal();
    };

    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            setIsSuccessModalVisible(false);
            location.reload();
        }, 1000); // 1 segundo
    };



    const renderContent = () => {
        switch (activeTab) {
            case 'infopostu':
                return (
                    <div>
                        {Infopostu.map((info, index) => (
                            <div key={index} className="bg-greyBlack p-12 rounded-xl mb-4">
                                <div className="grid grid-cols-3 p-3 justify-between">
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Nombre Postulante</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{`${info.nombres_postulante} ${info.apellidos_postulante}`}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Genero</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.genero}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Municipio</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.municipio}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">No_Documento</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.no_documento}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Celular</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.celular}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Educacion</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.educacion}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Tipo de Documento</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.tipo_documento}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Correo</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{info.correo}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'infoemp':
                return (
                    <div>
                        {Infoemp.map((empresa, index) => (
                            <div key={index} className="bg-greyBlack p-12 rounded-xl mb-4">
                                <div className="grid grid-cols-3 p-3 justify-between">
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Producto o Servicio</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{empresa.producto_servicio}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Fecha de Inicio</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{empresa.fecha_creacion}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Costos el Ultimo Año</h2>
                                        <p className="text-textBg font-semibold mb-6"> {empresa.costos_ult_ano}</p>

                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Razon Social</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{empresa.razon_social}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Celular Empresa</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{empresa.celular}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Ventas el Ultimo Año</h2>
                                        <p className="text-textBg font-semibold mb-6">{empresa.ventas_ult_ano}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">NIT</h2>
                                        <p className="text-principalGreen font-semibold mb-6">{empresa.nit}</p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Empleados Permanentes</h2>
                                        <p className="text-textBg font-semibold mb-6">{empresa.empleados_perm}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'autoeva':
                return (
                    <div>
                        {Autoeva.map((info, index) => (
                            <div key={index} className="bg-greyBlack p-12 rounded-xl mb-4">
                                <div className="grid grid-cols-3 p-3 justify-between">
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Estrategia Y Direccion</h2>
                                        <p className="text-textBg font-semibold mb-6">Calificacion: <span className='text-principalGreen'>{info.Estrategia_Direccion}</span></p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Marketing</h2>
                                        <p className="text-textBg font-semibold mb-6">Calificacion: <span className='text-amarillo'>{info.Marketing}</span></p>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Operaciones</h2>
                                        <p className="text-textBg font-semibold mb-6">Calificacion: <span className='text-red'>{info.Operaciones}</span></p>
                                        <h2 className="text-xl font-bold mt-2 mb-2 text-white">Ventas</h2>
                                        <p className="text-textBg font-semibold mb-6">Calificacion: <span className='text-principalGreen'>{info.Ventas}</span></p>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className="text-xl font-bold mb-2 text-white">Talento Humano</h2>
                                        <p className="text-textBg font-semibold mb-6">Calificacion: <span className='text-red'>{info.Talento_Humano}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleConfirm} />
            <CancelModal isCOpen={isCOpen} closeCModal={closeCModal} handleCancel={handleCancel} />
            <div className="p-2">
                <div className="flex space-x-8 mb-6">
                    <button
                        onClick={() => setActiveTab('infopostu')}
                        className={`py-2 px-4 font-semibold ${activeTab === 'infopostu' ? 'border-b-2 border-principalGreen text-white' : 'text-textBg'}`}
                    >
                        Informacion Postulante
                    </button>
                    <button
                        onClick={() => setActiveTab('infoemp')}
                        className={`py-2 px-4 font-semibold ${activeTab === 'infoemp' ? 'border-b-2 border-principalGreen text-white' : 'text-textBg'}`}
                    >
                        Informacion Empresa
                    </button>
                    <button
                        onClick={() => setActiveTab('autoeva')}
                        className={`py-2 px-4 font-semibold ${activeTab === 'autoeva' ? 'border-b-2 border-principalGreen text-white' : 'text-textBg'}`}
                    >
                        AutoEvaluacion
                    </button>
                    <div className='flex w-[65rem] py-5 items-center justify-end font-semibold'>

                        <button onClick={openModal} className='bg-principalGreen rounded-tl-xl rounded-bl-xl p-2 text-white hover:bg-white hover:text-principalGreen'>Aceptar</button>
                        <button onClick={openCModal} className='bg-red rounded-tr-xl rounded-br-xl p-2 text-white hover:bg-white hover:text-red'>Rechazar</button>

                    </div>

                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
            {/* Modal de éxito */}
            {isSuccessModalVisible && (
                <Modalcarga />
            )}
        </>
    );
};

export default DeveloperPortal;
