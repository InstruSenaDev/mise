import React, { useState, useEffect } from 'react';
import SelectComponent from '../../inputs/selectores/selectores';
import './formsautoevaaluacion.css';
import ConfirmModal from '../../modales/modalconfirm';
import { getDate } from '../../../helpers/getDate.js';

/**
 * Componente `FormAuto` para manejar la autoevaluación de una empresa.
 * 
 * El componente permite a los usuarios calificar diferentes áreas de su empresa 
 * y envía los datos a un servidor a través de una API. También maneja la visualización 
 * de modales de confirmación y éxito.
 * 
 * @returns {JSX.Element} El componente `FormAuto`.
 */
export const FormAuto = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para el modal de confirmación
    const [errors, setErrors] = useState({}); // Estado para almacenar errores de validación
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar el modal de errores
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Estado para mostrar el modal de éxito
    const [empresaNIT, setEmpresaNIT] = useState(null); // Estado para almacenar el NIT de la empresa

    // Hook para recuperar el NIT de la empresa del localStorage
    useEffect(() => {
        const nit = localStorage.getItem('empresa_nit');
        if (nit) {
            const nitInt = parseInt(nit, 10); // Convierte el NIT a entero
            if (!isNaN(nitInt)) {
                setEmpresaNIT(nitInt); // Solo establece el NIT si es un número válido
                setValues(prevValues => ({
                    ...prevValues,
                    nit: nitInt, // Asigna el NIT como un número en los valores del formulario
                }));
            } else {
                console.error('El NIT recuperado no es un número válido');
            }
        } else {
            console.error('No se encontró el NIT de la empresa en localStorage');
        }
    }, []);

    /**
     * Valida el formulario de autoevaluación.
     * 
     * @returns {Object} Un objeto con los errores de validación.
     */
    const validateForm = () => {
        const newErrors = {};

        if (!values.estrategia) {
            newErrors.estrategia = "Debe ingresar una calificación para estrategia.";
        }

        if (!values.operaciones) {
            newErrors.operaciones = "Debe ingresar una calificación para operaciones.";
        }

        if (!values.marketing) {
            newErrors.marketing = "Debe ingresar una calificación para marketing.";
        }

        if (!values.ventas) {
            newErrors.ventas = "Debe ingresar una calificación para ventas.";
        }

        if (!values.talentoHumano) {
            newErrors.talentoHumano = "Debe ingresar una calificación para talento humano.";
        }

        return newErrors;
    }

    const closeModalE = () => {
        setIsModalVisible(false); // Cierra el modal de errores
    };

    const closeModal = () => {
        setIsOpen(false); // Cierra el modal de confirmación
    };

    const openModal = () => setIsOpen(true); // Abre el modal de confirmación

    const optionsautoevaluacion = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];

    const [values, setValues] = useState({
        estrategia: "",
        operaciones: "",
        marketing: "",
        ventas: "",
        talentoHumano: "",
        nit: "",
        fecha: ""
    });

    /**
     * Maneja el cambio de valor de los campos del formulario.
     * 
     * @param {string} name - El nombre del campo del formulario.
     * @param {string} value - El nuevo valor del campo.
     */
    const handleInputChange = (name, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    /**
     * Maneja el envío del formulario.
     * 
     * @param {React.FormEvent} event - El evento de envío del formulario.
     */
    const handleForm = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Establece los errores de validación
            closeModal();
            setIsModalVisible(true); // Muestra el modal de errores
        } else {
            // Asegurarse de que el NIT esté presente
            if (!empresaNIT) {
                console.error("No se pudo completar la autoevaluación sin el NIT de la empresa");
                return;
            }

            // Preparar los datos para enviar al endpoint de autoevaluación
            const autoevaluacionData = {
                nit: empresaNIT, // Aquí se vincula la autoevaluación con el NIT
                fecha: getDate(),
                comentarios: '', // Puedes agregar comentarios si es necesario
                estrategia: values.estrategia,
                operaciones: values.operaciones,
                marketing: values.marketing,
                ventas: values.ventas,
                talentoHumano: values.talentoHumano,
            };

            // Enviar los datos de la autoevaluación
            fetch('http://localhost:8000/api/v2/registro-autoevaluacion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(autoevaluacionData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Autoevaluación registrada exitosamente:', data);

                    // Ahora enviar los datos de calificación por cada módulo al endpoint /calificacion-modulo/
                    const calificaciones = [
                        { calificacion: values.estrategia, id_modulo: 1, id_autoevaluacion: data.id_autoevaluacion },
                        { calificacion: values.operaciones, id_modulo: 2, id_autoevaluacion: data.id_autoevaluacion },
                        { calificacion: values.marketing, id_modulo: 3, id_autoevaluacion: data.id_autoevaluacion },
                        { calificacion: values.ventas, id_modulo: 4, id_autoevaluacion: data.id_autoevaluacion },
                        { calificacion: values.talentoHumano, id_modulo: 5, id_autoevaluacion: data.id_autoevaluacion },
                    ];

                    // Enviar las calificaciones individualmente al endpoint de calificación de módulos
                    Promise.all(calificaciones.map((calificacion) => 
                        fetch('http://localhost:8000/api/v2/calificacion-modulo/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(calificacion),
                        })
                        .then(response => response.json())
                        .then(calificacionResponse => {
                            if (calificacionResponse.success) {
                                console.log(`Calificación para el módulo ${calificacion.id_modulo} registrada exitosamente:`, calificacionResponse);
                            } else {
                                console.error(`Error al registrar la calificación para el módulo ${calificacion.id_modulo}:`, calificacionResponse);
                            }
                        })
                        .catch(error => {
                            console.error(`Error al enviar la calificación para el módulo ${calificacion.id_modulo}:`, error);
                        })
                    ))
                    .then(() => {
                        // Limpiar el localStorage y mostrar el modal de éxito una vez que se registren las calificaciones
                        localStorage.clear();
                        openSuccessModal();
                    })
                    .catch(error => {
                        console.error('Error al enviar las calificaciones de los módulos:', error);
                    });
                } else {
                    console.error('Error en el registro de la autoevaluación:', data);
                }
            })
            .catch(error => {
                console.error('Error al enviar los datos de la autoevaluación:', error);
            });
        }
    };

    /**
     * Abre el modal de éxito y redirige a la página principal después de 5 segundos.
     */
    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        closeModal();
        setTimeout(() => {
            setIsSuccessModalVisible(false);
            window.location.href = "/"; // Redirige a la página principal
        }, 5000); // 5 segundos
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleForm} />
            <div className='bg-greyBlack w-full lg:w-full h-auto p-5 flex flex-col gap-2 rounded-2xl'>
                <div className="flex justify-center">
                    <p className="font-bold text-2xl lg:text-3xl text-left">DIAGNÓSTICO</p>
                </div>
                <p className="text-sm lg:text-base text-center lg:text-left">
                    De 1 a 10, siendo 1 la calificacion mas baja y 10 la mas alta, <br /> 
                    califique como evalua el desempeño de su empresa en las <br /> 
                    siguientes areas:
                </p>
                <form className="form items-center rounded-xl p-3 flex flex-col justify-center gap-10 lg:gap-[2.5rem]">
                    <div className="flex flex-col gap-4 justify-center w-full">
                        {/* Estrategia y Dirección */}
                        <div className='flex flex-col lg:flex-row gap-3 items-center'>
                            <p className='text-base lg:text-xl w-full text-center lg:text-left'>Estrategia y Dirección</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="estrategia"
                                options={optionsautoevaluacion}
                                value={values.estrategia}
                                onChange={(value) => handleInputChange("estrategia", value)}
                            />
                        </div>
                        {/* Operaciones */}
                        <div className='flex flex-col lg:flex-row gap-3 items-center'>
                            <p className='text-base lg:text-xl w-full text-center lg:text-left'>Operaciones</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="operaciones"
                                options={optionsautoevaluacion}
                                value={values.operaciones}
                                onChange={(value) => handleInputChange("operaciones", value)}
                            />
                        </div>
                        {/* Marketing */}
                        <div className='flex flex-col lg:flex-row gap-3 items-center'>
                            <p className='text-base lg:text-xl w-full text-center lg:text-left'>Marketing</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="marketing"
                                options={optionsautoevaluacion}
                                value={values.marketing}
                                onChange={(value) => handleInputChange("marketing", value)}
                            />
                        </div>
                        {/* Ventas */}
                        <div className='flex flex-col lg:flex-row gap-3 items-center'>
                            <p className='text-base lg:text-xl w-full text-center lg:text-left'>Ventas</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="ventas"
                                options={optionsautoevaluacion}
                                value={values.ventas}
                                onChange={(value) => handleInputChange("ventas", value)}
                            />
                        </div>
                        {/* Talento Humano */}
                        <div className='flex flex-col lg:flex-row gap-3 items-center'>
                            <p className='text-base lg:text-xl w-full text-center lg:text-left'>Talento Humano</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="talentoHumano"
                                options={optionsautoevaluacion}
                                value={values.talentoHumano}
                                onChange={(value) => handleInputChange("talentoHumano", value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-start">
                        <button
                            onClick={openModal}
                            type='button'
                            className="bg-principalGreen px-4 lg:px-6 py-2 font-bold text-lg lg:text-2xl rounded-lg"
                        >
                            Postular
                        </button>
                    </div>
                </form>
            </div>
            {/* Modal para mostrar los errores */}
            <div
                className={`fixed top-10 right-0 rounded-l-3xl w-1/3 bg-white shadow-lg transform ${isModalVisible ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-500 ease-in-out`}
            >
                <div className="bg-red rounded-tl-3xl text-white p-4">
                    <h2 className="text-xl font-bold">Error de Registro</h2>
                    <button
                        className="absolute top-2 right-2 text-white"
                        onClick={closeModalE}
                    >
                        X
                    </button>
                </div>
                <div className="p-4">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index} className="text-black">
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Modal de éxito */}
            {isSuccessModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-black">Su solicitud está en proceso</h2>
                        <p className="mt-4 text-black">Muchas gracias por participar.</p>
                        <div className="loading-balls">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormAuto;
