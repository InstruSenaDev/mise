import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DownloadPDFButton from "../inputs/botones/botonpdf";

/**
 * Componente `TarjetasTema`
 * 
 * Este componente muestra una serie de tarjetas que representan temas obtenidos desde un endpoint. Cada tarjeta puede ser clicada para abrir un modal con detalles adicionales del tema.
 * 
 * Props:
 * - `nit` (string): Identificador de la empresa que se usa para obtener los temas relacionados desde la API.
 * 
 * @param {Object} props - Props del componente.
 * @param {string} props.nit - Identificador de la empresa para la consulta de temas.
 * @returns {JSX.Element} Elemento JSX que representa las tarjetas de temas y un modal para detalles adicionales.
 */
const TarjetasTema = ({ nit }) => {
    const [temas, setTemas] = useState([]);
    const [selectedTema, setSelectedTema] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        if (nit) {
            // Obtener temas desde el endpoint
            fetch(`http://localhost:8000/api/v2/calificaciones-bajas/empresa/${nit}/`)
                .then(response => response.json())
                .then(data => {
                    // Aplana la estructura para obtener una lista de temas
                    const extraidos = data.flatMap(calificacion =>
                        calificacion.preguntas.flatMap(pregunta => pregunta.tema) // Asegúrate de usar flatMap aquí
                    );
                    setTemas(extraidos);
                })
                .catch(error => console.error("Error fetching temas:", error));
        }
    }, [nit]);

    const openModal = (tema) => {
        setSelectedTema(tema);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTema(null);
    };

    return (
        <div className="bg-greyBlack rounded-xl p-4 text-white w-full">

            <div className="flex flex-row justify-between py-2">
                <h2 className="text-2xl font-bold mb-4 text-center">Procesos en los que se encuentra la empresa</h2>
                <div className=" flex flex-row gap-5">
                    <a href={`/diagnostico/empresa/${nit}`}>
                        <button className="bg-transparent border border-white hover:bg-white rounded-md text-white hover:text-principalGreen text-center font-semibold cursor-pointer w-auto h-10 p-2">
                            Ir a Diagnostico Inicial
                        </button>
                    </a>
                    <DownloadPDFButton pdfType={"inicial"} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-2 max-h-[35rem] overflow-y-auto" style={styles.customScrollbar}>
                {temas.map((tema) => (
                    <div
                        key={tema.id_tema}
                        className="relative flex items-center justify-center bg-darkGrey rounded-lg border border-principalGreen shadow-lg hover:shadow-xl hover:bg-principalGreen transition-all duration-300 cursor-pointer"
                        onClick={() => openModal(tema)}
                    >
                        <div className="absolute inset-0 p-4 flex items-center justify-center">
                            <p className="text-lg font-semibold text-center">{tema.objetivo}</p>
                        </div>
                        <div className="w-full h-full" style={{ aspectRatio: '1 / 1' }}></div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedTema && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-greyBlack text-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-auto">
                        <h3 className="text-2xl font-bold mb-4">Detalles del Tema</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[22rem] overflow-y-auto" style={styles.customScrollbar}>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Módulo:</strong></p>
                                <p className="mb-4">{selectedTema.id_modulo}</p> {/* Cambia esto si tienes el nombre del módulo en el tema */}
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Sesión:</strong></p>
                                <p className="mb-4">{selectedTema.num_sesion}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Objetivo:</strong></p>
                                <p className="mb-4">{selectedTema.objetivo}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Alcance:</strong></p>
                                <p className="mb-4">{selectedTema.alcance}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Contenido:</strong></p>
                                <p className="mb-4">{selectedTema.contenido}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Conferencista:</strong></p>
                                <p className="mb-4">{selectedTema.conferencista}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Fecha:</strong></p>
                                <p className="mb-4">{selectedTema.fecha}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Horario:</strong></p>
                                <p className="mb-4">{selectedTema.horario}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2"><strong>Ubicación:</strong></p>
                                <p className="mb-4">{selectedTema.ubicacion}</p>
                            </div>
                        </div>
                        <button
                            className="mt-6 px-4 py-2 bg-principalGreen text-white rounded-lg hover:bg-darkGrey transition-colors duration-300"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

TarjetasTema.propTypes = {
    nit: PropTypes.string.isRequired,
};

export default TarjetasTema;
