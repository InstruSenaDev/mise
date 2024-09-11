import React, { useState } from 'react';
import SelectComponent from '../../inputs/selectores/selectores';
import './formsregistroemp.css';
import { DatePicker } from '@tremor/react';
import ConfirmModal from '../../modales/modalconfirm.jsx';
import Boton from '../../inputs/boton.jsx';

export const FormRegistro = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);

    const optionstamaño = [
        { value: 'Microempresa', label: 'Microempresa' },
        { value: 'Pequeña empresa', label: 'Pequeña empresa' },
        { value: 'Mediana empresa', label: 'Mediana empresa' },
        { value: 'Empresa grande', label: 'Empresa grande' },
    ];

    const [values, setValues] = useState({
        producto: '',
        fecha_inicio: '',
        celular: '',
        razon_social: '',
        nit: '',
        no_empleados: '',
        ventas_anopasado: '',
        gastos_costos: '',
        fecha_registro: null,
        tamano_empresa: '',
        nombre_empresa: "",
        direccion: "",
        act_economica: "",
        gerente: "",
        correo: "",
        pagina_web: "",
        sector: "",

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
        if (name === 'gastos_costos' || name === 'ventas_anopasado') {
            setValues(prevValues => ({
                ...prevValues,
                [name]: formatCurrency(prevValues[name]),
            }));
        }
    };



    const handleInputChange = (name, value) => {
        if (name === "razon_social" || name === "producto") {
            // Filtrar caracteres no permitidos
            value = value.replace(/[0-9]/g, "");
        }
        if (name === "celular") {
            if (value.length > 10) {
                return; // Evitar que se ingrese más de 10 dígitos
            }
        }
        if (name === "nit") {
            if (value.length > 9) {
                return; // Evitar que se ingrese más de 9 dígitos
            }
        }
        if (name === "ndocumento") {
            if (value.length > 5) {
                return; // Evitar que se ingrese más de 5 dígitos
            }
        }
        if (name === "ventas_anopasado") {
            if (value.length > 10) {
                return; // Evitar que se ingrese más de 10 dígitos
            }
        }
        if (name === "gastos_costos") {
            if (value.length > 10) {
                return; // Evitar que se ingrese más de 10 dígitos
            }
        }
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!values.fecha_inicio) {
            newErrors.fecha_inicio = "Debe ingresar la fecha de inicio de la empresa.";
        }

        if (!values.celular) {
            newErrors.celular = "Debe ingresar un numero de celular.";
        }

        if (!values.razon_social) {
            newErrors.razon_social = "Debe ingresar la razon social de la empresa.";
        }

        if (!values.nit) {
            newErrors.nit = "Debe ingresar el NIT de la empresa.";
        }

        if (!values.no_empleados) {
            newErrors.no_empleados = "Debe ingresar el numero de empleados de la empresa.";
        }
        if (!values.ventas_anopasado) {
            newErrors.ventas_anopasado = "Debe ingresar las ventas del año pasado.";
        }

        if (!values.gastos_costos) {
            newErrors.gastos_costos = "Debe ingresar los gastos o costos del año pasado.";
        }

        if (!values.tamano_empresa) {
            newErrors.tamano_empresa = "Debe seleccionar el tamaño de la empresa.";
        }

        if (!values.nombre_empresa) {
            newErrors.nombre_empresa = "Debe ingresae el nombre de la empresa.";
        }

        if (!values.direccion) {
            newErrors.direccion = "Debe ingresar la dirección de la empresa.";
        }

        if (!values.act_economica) {
            newErrors.act_economica = "Debe ingresar la actividad economica de la empresa.";
        }

        if (!values.gerente) {
            newErrors.gerente = "Debe ingresar el gerente de la empresa.";
        }

        if (!values.correo) {
            newErrors.correo = "Debe ingresar el correo de la empresa.";
        }

        if (!values.pagina_web) {
            newErrors.pagina_web = "Debe ingresar la URL de la pagina web de la empresa.";
        }

        if (!values.sector) {
            newErrors.sector = "Debe ingresar el sector empresarial.";
        }

        return newErrors;
    }

    const handleConfirm = (event) => {
        event.preventDefault();
        const now = new Date();
        const updatedValues = {
            ...values,
            fecha_registro: now.toLocaleString(),
        };

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            closeModal();
            setIsModalVisible(true);
        } else {
            console.log('Inputs value:', updatedValues);
            setValues(updatedValues);  // Actualizamos los valores antes de cerrar el modal
            closeModal();
            window.location.href = "/autoevaluacion";
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

            <div class="flex flex-row w-full justify-between">
                <p class="font-bold text-3xl text-left">Registro Empresa</p>
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
            <form className="form custom-scrollbar w-full xl:max-h-[51rem] lg:max-h-[47rem] overflow-y-auto flex flex-row bg-greyBlack rounded-xl gap-3">
                <div className='flex flex-col gap-6 w-full p-6 rounded-xl'>
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.nombre_empresa}
                                name="nombre_empresa"
                                placeholder="Nombre de la Empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.direccion}
                                name="direccion"
                                placeholder="Ingrese dirección de la empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        {/* Segunda fila de inputs */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.razon_social}
                                name="razon_social"
                                placeholder="Razón Social de la Empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="number"
                                value={values.celular}
                                name="celular"
                                placeholder="Número de celular..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        {/* Tercera fila de inputs */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="number"
                                value={values.no_empleados}
                                name="no_empleados"
                                placeholder="Número de empleados..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="number"
                                value={values.nit}
                                name="nit"
                                placeholder="NIT de la empresa"
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        {/* Más inputs */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.act_economica}
                                name="act_economica"
                                placeholder="Actividad económica..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.gerente}
                                name="gerente"
                                placeholder="Gerente de la empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="email"
                                value={values.correo}
                                name="correo"
                                placeholder="Correo de la Empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />

                            <input
                                className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                                type="text"
                                value={values.pagina_web}
                                name="pagina_web"
                                placeholder="Página web de la empresa..."
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>

                        {/* Inputs adicionales y componentes */}
                        <input
                            className="h-[3.5rem] w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal placeholder-shown:border-white"
                            type="text"
                            value={values.producto}
                            name="producto"
                            placeholder="Producto o servicio..."
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />

                        <DatePicker
                            name="fecha_inicio"
                            className="z-0 mx-auto pt-2 h-[3.5rem]"
                            onValueChange={(value) => {
                                handleInputChange('fecha_inicio', value);
                            }}
                        />

                        <SelectComponent
                            type={"Tamaño de la empresa..."}
                            Select="tamano_empresa"
                            options={optionstamaño}
                            value={values.tamano_empresa || ''}
                            onChange={(value) => handleInputChange("tamano_empresa", value)}
                        />
                        <div className="flex justify-center pb-4">
                            <button
                                className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg"
                                onClick={openModal}
                                type='button'
                            >
                                Siguiente
                            </button>
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