/**
 * aceptaremp.jsx
 *
 * Componente que muestra el portal del desarrollador con diferentes secciones de información,
 * incluyendo datos del postulante, empresa, y autoevaluaciones. Permite aceptar o rechazar solicitudes
 * de empresas, y visualiza información detallada mediante pestañas.
 *
 * Componentes utilizados:
 * - ConfirmModal: Muestra un modal de confirmación para aceptar solicitudes.
 * - CancelModal: Muestra un modal de cancelación para rechazar solicitudes.
 * - Modalcarga: Muestra un modal de carga o éxito tras confirmar o rechazar una acción.
 *
 * Funcionalidad:
 * - Permite la navegación entre tres pestañas: 'Información del Postulante', 'Información de la Empresa', y 'Autoevaluación'.
 * - Recupera datos de la empresa, postulante y autoevaluación de una API REST utilizando `useEffect`.
 * - Usa `useParams` para obtener el NIT de la empresa desde la URL.
 * - Las solicitudes de aceptación y rechazo se manejan mediante `fetch` para actualizar el estado de la empresa.
 * - Usa Tailwind CSS para los estilos, con un diseño responsivo y adaptable a diferentes tamaños de pantalla.
 * - Los botones de aceptar y rechazar cambian su estado visual al hacer hover.
 *
 * Estados:
 * - activeTab: Pestaña activa (products, infoemp, autoeva).
 * - isOpen, isCOpen: Controla la visibilidad de los modales de confirmación y cancelación.
 * - isSuccessModalVisible, isSuccessCModalVisible: Controla la visibilidad del modal de éxito.
 * - companyData: Almacena los datos de la empresa recuperados de la API.
 * - postulanteData: Almacena los datos del postulante recuperados de la API.
 * - autoevaluacionData, calificacionesModulos: Almacenan los datos de autoevaluación y las calificaciones de los módulos.
 * - modulos: Almacena los módulos relacionados con la autoevaluación.
 *
 * Estilos:
 * - Usa clases de Tailwind CSS para la disposición de los elementos y los efectos de transición.
 * - Scrollbars personalizados aplicados al contenido con `overflow-y-auto`.
 *
 * Hooks:
 * - useState: Para manejar los estados locales del componente.
 * - useEffect: Para realizar las llamadas a la API al cargar el componente.
 * - useParams: Para obtener el NIT de la URL.
 * - useNavigate: Para redirigir al usuario tras confirmar o rechazar una solicitud.
 */


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../../components/modales/modalconfirm';
import Modalcarga from '../../components/modales/modalcarga/modalcarga';
import CancelModal from "../../components/modales/modalcancel";
import { Autoeva } from '../../helpers/autoeva';
import { useNavigate } from 'react-router-dom';

const DeveloperPortal = () => {
    const { nit } = useParams(); // Extrae el NIT de la URL
    const [activeTab, setActiveTab] = useState('products');
    const [isOpen, setIsOpen] = useState(false);
    const [isCOpen, setIsCOpen] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSuccessCModalVisible, setIsSuccessCModalVisible] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [postulanteData, setPostulanteData] = useState(null);
    const [autoevaluacionData, setAutoevaluacionData] = useState(null);
    const [calificacionesModulos, setCalificacionesModulos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        if (nit) {
            // Fetch company data based on NIT
            fetch(`http://localhost:8000/api/v2/empresas/${nit}/`)
                .then(response => response.json())
                .then(data => {
                    setCompanyData(data);

                    // Fetch postulante data based on postulante ID
                    if (data.id_postulante) {
                        fetch(`http://localhost:8000/api/v2/postulante/${data.id_postulante}/`)
                            .then(response => response.json())
                            .then(postulante => setPostulanteData(postulante))
                            .catch(error => console.error('Error fetching postulante data:', error));
                    }

                    // Fetch autoevaluacion data based on company nit
                    fetch(`http://localhost:8000/api/v2/autoevaluacion/`)
                        .then(response => response.json())
                        .then(autoevaluaciones => {
                            console.log('Autoevaluacion data:', autoevaluaciones);

                            // Filtra las autoevaluaciones para el NIT específico
                            const autoevaluacionData = autoevaluaciones.filter(autoeva => autoeva.nit === parseInt(nit));

                            if (autoevaluacionData.length > 0) {
                                // Extrae el ID de la autoevaluación para las calificaciones
                                const autoevaluacionId = autoevaluacionData[0].id_autoevaluacion; // Solo toma la primera autoevaluación con el NIT

                                // Fetch calificaciones de módulos
                                fetch(`http://localhost:8000/api/v2/calificaciones-modulos/${autoevaluacionId}/`)
                                    .then(response => response.json())
                                    .then(calificaciones => {
                                        console.log('Calificaciones data:', calificaciones);

                                        // Fetch modulos data
                                        fetch('http://localhost:8000/api/v2/modulo-autoevaluacion/')
                                            .then(response => response.json())
                                            .then(modulosData => {
                                                console.log('Modulos data:', modulosData);
                                                setModulos(modulosData);

                                                // Extrae las calificaciones, relacionándolas con los módulos
                                                const calificacionesConModulos = calificaciones.map(calificacion => {
                                                    // Busca el módulo correspondiente en la lista de módulos
                                                    const modulo = modulosData.find(mod => mod.id_modulo === calificacion.id_modulo);
                                                    return {
                                                        calificacion: calificacion.calificacion,
                                                        nombre_modulo: modulo ? modulo.nombre : 'Desconocido'
                                                    };
                                                });

                                                console.log('Calificaciones con módulos:', calificacionesConModulos);
                                                setCalificacionesModulos(calificacionesConModulos);
                                            })
                                            .catch(error => console.error('Error fetching modulos data:', error));
                                    })
                                    .catch(error => console.error('Error fetching calificaciones data:', error));
                            } else {
                                console.log('No se encontró autoevaluación para el NIT proporcionado.');
                                setCalificacionesModulos([]);
                            }
                        })
                        .catch(error => console.error('Error fetching autoevaluacion data:', error));
                })
                .catch(error => console.error('Error fetching company data:', error));
        }
    }, [nit]);

    // Estilos en JSX
    const styles = {
        customScrollbar: {
            scrollbarWidth: '13px',
            scrollbarColor: '#888 #262b32',
        },
        customScrollbarTrack: {
            background: '#262b32',
            borderRadius: '12px',
        },
        customScrollbarThumb: {
            background: '#888',
            borderRadius: '10px',
        },
        customScrollbarThumbHover: {
            background: '#555',
        }
    };

    const closeModal = () => setIsOpen(false);
    const closeCModal = () => setIsCOpen(false);
    const openModal = () => setIsOpen(true);
    const openCModal = () => setIsCOpen(true);

    const handleCancel = () => {
        openSuccessModal();
        closeCModal();
    };

    const handleConfirm = () => {
        openSuccessCModal();
        closeModal();
    };

    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            fetch(`http://localhost:8000/api/v2/update-empresa-status/${nit}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 2 }),
            })
                .then(response => response.ok ? response.json() : Promise.reject('Error al actualizar el estado'))
                .then(() => {
                    setIsSuccessModalVisible(false);
                    navigate(`/aceptar-empresas`);
                })
                .catch(error => console.error('Error:', error));
        }, 1000); // 1 segundo
    };

    const openSuccessCModal = () => {
        setIsSuccessCModalVisible(true);
        setTimeout(() => {
            fetch(`http://localhost:8000/api/v2/update-empresa-status/${nit}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 3 }),
            })
                .then(response => response.ok ? response.json() : Promise.reject('Error al actualizar el estado'))
                .then(() => {
                    setIsSuccessModalVisible(false);
                    navigate(`/aceptar-empresas`);
                })
                .catch(error => console.error('Error:', error));
        }, 1000); // 1 segundo
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'infopostu':
                if (!postulanteData) return <div>Loading postulante data...</div>;
                return (
                    <div className="w-full">
                        <div className="bg-greyBlack p-3 sm:p-5 rounded-xl mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Nombre</h2>
                                        <p className="text-principalGreen font-semibold">
                                            {postulanteData.nombres_postulante} {postulanteData.apellidos_postulante}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Celular</h2>
                                        <p className="text-principalGreen font-semibold">{postulanteData.celular}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Correo</h2>
                                        <p className="text-principalGreen font-semibold">{postulanteData.correo}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Municipio</h2>
                                        <p className="text-principalGreen font-semibold">{postulanteData.municipio}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Tipo de Documento</h2>
                                        <p className="text-principalGreen font-semibold">{postulanteData.tipo_documento}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">No. Documento</h2>
                                        <p className="text-principalGreen font-semibold">{postulanteData.no_documento}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'infoemp':
                if (!companyData) return <div>Loading company data...</div>;
                return (
                    <div className="w-full">
                        <div className="bg-greyBlack p-3 sm:p-5 rounded-xl mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Producto o Servicio</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.producto_servicio}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Fecha de Inicio</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.fecha_creacion}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Costos el Ultimo Año</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.costos_ult_ano}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Razon Social</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.razon_social}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Celular Empresa</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.celular}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Ventas el Ultimo Año</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.ventas_ult_ano}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">NIT</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.nit}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Empleados Permanentes</h2>
                                        <p className="text-principalGreen font-semibold">{companyData.empleados_perm}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'autoeva': {
                return (
                    <div>
                        {
                            calificacionesModulos && calificacionesModulos.length > 0 ? (
                                calificacionesModulos.map((calificacion, index) => {


                                    return (
                                        <div key={index} className="bg-greyBlack p-5 rounded-xl mb-4">
                                            <div className="grid grid-cols-2 p-3 justify-between">
                                                <div className="col-span-1">
                                                    <h2 className="text-xl font-bold mb-2 text-white">Módulo</h2>
                                                    <p className="text-principalGreen font-semibold mb-2">{calificacion.nombre_modulo}</p>
                                                </div>
                                                <div className="col-span-1">
                                                    <h2 className="text-xl font-bold mb-2 text-white">Calificación</h2>
                                                    <p className="text-principalGreen font-semibold mb-2">{calificacion.calificacion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-greyBlack p-5 rounded-xl mb-4">
                                    <p className="text-white">No se encontraron calificaciones para esta autoevaluación.</p>
                                </div>
                            )}
                    </div>
                );
            }




            default:
                return null;
        }
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleConfirm} />
            <CancelModal isCOpen={isCOpen} closeCModal={closeCModal} handleCancel={handleCancel} />
            <div className="p-2 w-[83.5rem]">
                <div className="flex xl:flex-row lg:flex-row flex-col xl:space-x-8">
                    <div className='flex flex-row xl:space-x-8 lg:space-x-8 space-x-7 mb-6 xl:w-full lg:w-full max-md:max-w-[25rem] overflow-x-auto'>
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
                    </div>
                    <div className='flex xl:w-[65rem] lg:w-full xl:py-5 lg:py-5 pb-3 items-center xl:justify-end lg:justify-end justify-center font-semibold'>
                        <button onClick={openModal} className='bg-principalGreen rounded-tl-xl rounded-bl-xl p-2 text-white hover:bg-white hover:text-principalGreen'>Aceptar</button>
                        <button onClick={openCModal} className='bg-red rounded-tr-xl rounded-br-xl p-2 text-white hover:bg-white hover:text-red'>Rechazar</button>
                    </div>
                </div>
                <div className='overflow-y-auto lg:max-h-[50rem]' style={styles.customScrollbar}>
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
