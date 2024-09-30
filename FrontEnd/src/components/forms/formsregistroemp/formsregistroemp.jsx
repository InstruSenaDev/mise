import React, { useState } from 'react';
import SelectComponent from '../../inputs/selectores/selectores';
import './formsregistroemp.css';
import { DatePicker } from '@tremor/react';
import ConfirmModal from '../../modales/modalconfirm.jsx';
import Boton from '../../inputs/botones/boton.jsx';
import { format } from 'date-fns'

export const FormRegistro = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);

    const optionstamaño = [
        { value: 'Microempresa', label: 'Microempresa' },
        { value: 'Pequeña empresa', label: 'Pequeña empresa' },
        { value: 'Mediana empresa', label: 'Mediana empresa' },
        { value: 'Empresa grande', label: 'Empresa grande' },
    ];

    const [values, setValues] = useState({
        producto_servicio: '',
        fecha_creacion: '',
        celular: '',
        razon_social: '',
        nit: '',
        empleados_perm: '',
        ventas_ult_ano: '',
        costos_ult_ano: '',
        fecha_registro: '2024-01-01',
        sector: '',
        nombre_empresa: '',
        direccion: '',
        act_economica: '',
        gerente: '',
        correo: '',
        pagina_web: '',
        estado: 1,
        id_programa: 1,
        id_postulante: '',
        diagnostico_value: 0,
    });

    const formatCurrency = (value) => {
        const number = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        if (isNaN(number)) return '';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(number);
    };


    const handleBlur = (name) => {
        // Ajusta los nombres para que coincidan con los nombres de los inputs
        if (name === 'costos_ult_ano' || name === 'ventas_ult_ano') {
            setValues(prevValues => ({
                ...prevValues,
                [name]: formatCurrency(prevValues[name]), // Aplicar formato de moneda
            }));
        }
    };



    const handleInputChange = (name, value) => {
        // Validación de celular: solo permite números, longitud máxima de 10
        if (name === "celular") {
            const regex = /^[0-9\b]+$/; // Solo números
            if (!regex.test(value) || value.length > 10) {
                return; // Evitar que se ingrese caracteres no válidos o más de 10 dígitos
            }
        }

        // Validación de NIT: solo permite números, longitud máxima de 9
        if (name === "nit") {
            const regex = /^[0-9\b]+$/; // Solo números
            if (!regex.test(value) || value.length > 9) {
                return; // Evitar que se ingrese caracteres no válidos o más de 9 dígitos
            }
        }

        // Validación de número de documento: solo permite números, longitud máxima de 5
        if (name === "ndocumento") {
            const regex = /^[0-9\b]+$/; // Solo números
            if (!regex.test(value) || value.length > 5) {
                return; // Evitar que se ingrese caracteres no válidos o más de 5 dígitos
            }
        }

        // Validación de ventas del año pasado: solo números y longitud máxima de 10
        if (name === "ventas_anopasado") {
            const regex = /^[0-9\b]+$/; // Solo números
            if (!regex.test(value) || value.length > 10) {
                return; // Evitar que se ingrese caracteres no válidos o más de 10 dígitos
            }
        }

        // Validación de costos del año pasado: solo números y longitud máxima de 10
        if (name === "gastos_costos") {
            const regex = /^[0-9\b]+$/; // Solo números
            if (!regex.test(value) || value.length > 10) {
                return; // Evitar que se ingrese caracteres no válidos o más de 10 dígitos
            }
        }

        // Validación de correo electrónico: formato correcto
        if (name === "correo") {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar correo
            if (!regex.test(value)) {
                return; // Evitar correos inválidos
            }
        }

        // Validación de página web: debe tener un formato válido
        if (name === "pagina_web") {
            const regex = /^(https?:\/\/)?([\w-]+)+[\w-]+(\.[\w-]{2,})+\/?$/; // Regex para URL
            if (!regex.test(value)) {
                return; // Evitar URLs no válidas
            }
        }

        // Actualiza el estado solo si todas las validaciones se cumplen
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const validateForm = () => {
        const newErrors = {};

        if (!values.fecha_creacion) {
            newErrors.fecha_creacion = "Debe ingresar la fecha de creación de la empresa.";
        }

        if (!values.celular) {
            newErrors.celular = "Debe ingresar un número de celular.";
        }

        if (!values.razon_social) {
            newErrors.razon_social = "Debe ingresar la razón social de la empresa.";
        }

        if (!values.nit) {
            newErrors.nit = "Debe ingresar el NIT de la empresa.";
        }

        if (!values.empleados_perm) {
            newErrors.empleados_perm = "Debe ingresar el número de empleados de la empresa.";
        }

        if (!values.ventas_ult_ano) {
            newErrors.ventas_ult_ano = "Debe ingresar las ventas del último año.";
        }

        if (!values.costos_ult_ano) {
            newErrors.costos_ult_ano = "Debe ingresar los costos del último año.";
        }

        if (!values.estado) {
            newErrors.estado = "Debe seleccionar el estado de la empresa.";
        }

        if (!values.nombre_empresa) {
            newErrors.nombre_empresa = "Debe ingresar el nombre de la empresa.";
        }

        if (!values.direccion) {
            newErrors.direccion = "Debe ingresar la dirección de la empresa.";
        }

        if (!values.act_economica) {
            newErrors.act_economica = "Debe ingresar la actividad económica de la empresa.";
        }

        if (!values.gerente) {
            newErrors.gerente = "Debe ingresar el nombre del gerente de la empresa.";
        }

        if (!values.correo) {
            newErrors.correo = "Debe ingresar el correo de la empresa.";
        }

        if (!values.pagina_web) {
            newErrors.pagina_web = "Debe ingresar la URL de la página web de la empresa.";
        }

        if (!values.sector) {
            newErrors.sector = "Debe ingresar el sector empresarial.";
        }

        return newErrors;
    }


    const handleConfirm = (event) => {
        event.preventDefault();
        const updatedValues = { ...values };

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            closeModal();
            setIsModalVisible(true);
        } else {
            // Recuperar el ID del postulante desde localStorage
            const idPostulante = localStorage.getItem('id_postulante');

            // Si no hay datos del postulante, manejar el error
            if (!idPostulante) {
                console.error('No se encontró el ID del postulante en localStorage');
                return;
            }

            // Preparar los datos de la empresa
            const empresaData = {
                nit: updatedValues.nit,
                nombre_empresa: updatedValues.nombre_empresa,
                celular: updatedValues.celular,
                razon_social: updatedValues.razon_social,
                direccion: updatedValues.direccion,
                act_economica: updatedValues.act_economica,
                gerente: updatedValues.gerente,
                producto_servicio: updatedValues.producto_servicio,
                correo: updatedValues.correo,
                pagina_web: updatedValues.pagina_web,
                fecha_creacion: updatedValues.fecha_creacion
                    ? format(new Date(values.fecha_creacion), "yyyy-MM-dd")
                    : null,
                ventas_ult_ano: updatedValues.ventas_ult_ano,
                costos_ult_ano: updatedValues.costos_ult_ano,
                empleados_perm: updatedValues.empleados_perm,
                sector: updatedValues.sector,
                estado: updatedValues.estado,
                id_programa: updatedValues.id_programa,
                fecha_registro: updatedValues.fecha_registro,
                id_postulante: parseInt(idPostulante, 10), // Convertir a número entero
                diagnostico_value: 0
            };

            // Primero registrar la empresa
            fetch('http://localhost:8000/api/v2/registro-empresa/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empresa: empresaData }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Registro de la empresa exitoso:', data);
                        // Almacenar el NIT de la empresa en localStorage
                        localStorage.setItem('empresa_nit', empresaData.nit);
                        // Redirigir a la vista de autoevaluación
                        window.location.href = "/autoevaluacion";
                    } else {
                        console.error('Error en el registro de la empresa:', data);
                        console.log(updatedValues);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar los datos de la empresa:', error);
                });

            // Actualizar los valores antes de cerrar el modal
            setValues(updatedValues);
            closeModal();
        }
    };







    const closeModalE = () => {
        setIsModalVisible(false);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => setIsOpen(true);

    return (
        <>
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleConfirm} />

            <div className="flex flex-row w-full justify-between">
                <p className="font-bold text-3xl text-left">Registro Empresa</p>
                <svg
                    fill="#ffffff"
                    height="45px"
                    width="45px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-51.2 -51.2 614.40 614.40"
                    xml:space="preserve"
                    stroke="#ffffff"
                    onClick={() => window.history.back()}
                    style={{ cursor: 'pointer' }}
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H179.499 l48.917,48.917c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 l-85.333-85.333c-1.963-1.963-3.52-4.309-4.608-6.933c-2.155-5.205-2.155-11.093,0-16.299c1.088-2.624,2.645-4.971,4.608-6.933 l85.333-85.333c8.341-8.341,21.824-8.341,30.165,0s8.341,21.824,0,30.165l-48.917,48.917H384c11.776,0,21.333,9.557,21.333,21.333 S395.776,277.333,384,277.333z"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <form className="form custom-scrollbar w-full max-h-[50rem] overflow-y-auto flex flex-row bg-greyBlack rounded-xl gap-3">
                <div className='flex flex-col gap-6 w-full p-6 rounded-xl'>
                    <div className="flex flex-col gap-6 w-full">
                        <div className='flex flex-row gap-6 w-full'>
                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.nombre_empresa}
                                name="nombre_empresa"
                                placeholder="Nombre de la Empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.direccion}
                                name="direccion"
                                placeholder="Ingrese dirección de la empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row gap-6'>
                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.razon_social}
                                name="razon_social"
                                placeholder="Razón Social de la Empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="number"
                                value={values.celular}
                                name="celular"
                                placeholder="Ingrese su número de celular"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        <div className='flex flex-row gap-6'>
                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="number"
                                value={values.empleados_perm}
                                name="empleados_perm"
                                placeholder="Ingrese el número de empleados permanentes"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="number"
                                value={values.nit}
                                name="nit"
                                placeholder="Ingrese el NIT de la empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row gap-6 w-full'>
                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.act_economica}
                                name="act_economica"
                                placeholder="Actividad Económica de la Empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.gerente}
                                name="gerente"
                                placeholder="Ingrese el gerente de la empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row gap-6 w-full'>
                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="email"
                                value={values.correo}
                                name="correo"
                                placeholder="Correo de la Empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                                type="text"
                                value={values.pagina_web}
                                name="pagina_web"
                                placeholder="Ingrese página web de la empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                        <input
                            className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                            type="text"
                            value={values.producto_servicio}
                            name="producto_servicio"
                            placeholder="Producto o Servicio"
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />

                        <DatePicker
                            color = ''
                            placeholder='Fecha de Creacion'
                            enableYearNavigation = {true}
                            name="fecha_creacion"
                            className="mx-auto pt-2 h-[3.5rem] colors:tremor-background-subtle z-0"
                            onValueChange={(value) => {
                                handleInputChange('fecha_creacion', value);
                            }}
                        />
                        {/*
                        <SelectComponent
                            type={"Tamaño de la empresa..."}
                            Select="estado"
                            options={optionstamaño}
                            value={values.estado || ''}
                            onChange={(value) => handleInputChange("estado", value)}
                        />
*/}
                        <input
                            className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                            type="text"
                            value={values.ventas_ult_ano}
                            name="ventas_ult_ano"
                            placeholder="Ingrese el total de ventas del año anterior"
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            onBlur={() => handleBlur('ventas_ult_ano')}
                        />
                        <input
                            className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                            type="text"
                            value={values.costos_ult_ano}
                            name="costos_ult_ano"
                            placeholder="Ingrese el total de gastos y costos del año anterior"
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            onBlur={() => handleBlur('costos_ult_ano')}
                        />
                        <input
                            className={`h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white`}
                            type="text"
                            value={values.sector}
                            name="sector"
                            placeholder="Ingrese el sector empresarial"
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        <div className="flex justify-end pb-2">
                            <Boton text={"Siguiente"} onClick={openModal} />
                        </div>
                    </div>
                </div>
            </form>


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
        </>
    );
}

export default FormRegistro;