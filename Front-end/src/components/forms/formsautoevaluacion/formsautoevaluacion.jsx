import React, { useState } from 'react';
import SelectComponent from '../../inputs/selectores/selectores';
import './formsautoevaaluacion.css';
import ConfirmModal from '../../modales/modalconfirm';

export const FormAuto = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!values.estrategia) {
            newErrors.estrategia = "Debe ingresar una calificacion para estrategia.";
        }

        if (!values.operaciones) {
            newErrors.operaciones = "Debe ingresar una calificacion para operaciones.";
        }

        if (!values.marketing) {
            newErrors.marketing = "Debe ingresar una calificacion para marketing.";
        }

        if (!values.ventas) {
            newErrors.ventas = "Debe ingresar una calificacion para ventas.";
        }

        if (!values.talentoHumano) {
            newErrors.talentoHumano = "Debe ingresar una calificacion para talento humano.";
        }

        return newErrors;
    }

    const closeModalE = () => {
        setIsModalVisible(false);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => setIsOpen(true);

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
    });

    const handleInputChange = (name, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleForm = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            closeModal();
            setIsModalVisible(true);
        } else {
            console.log("Inputs value:", values);
            closeModal();
            openSuccessModal();
        }
    }

    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            setIsSuccessModalVisible(false);
            window.location.href = "https://www.ccpalmira.org.co/programas-y-servicios-empresariales/mise/";
        }, 5000); // 5 segundos
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleForm} />
            <div className='bg-greyBlack w-max h-[49.5rem] p-12 flex flex-col gap-5 rounded-2xl'>
                <div className="flex flex-row justify-center">
                    <p className="font-bold text-3xl text-left">DIAGNOSTICO</p>
                </div>
                <p>
                    DE 1 A 10, SIENDO 1 LA CALIFICACIÓN MÁS BAJA Y 10 LA MÁS ALTA,<br />
                    CALIFIQUE CÓMO EVALÚA EL DESEMPEÑO DE SU EMPRESA EN LAS<br />
                    SIGUIENTES ÁREAS
                </p>
                <form className="form items-center rounded-xl p-3 flex flex-col justify-around gap-[10rem]">
                    <div className="flex flex-col gap-5 justify-center w-full">
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-xl w-full'>Estrategia y Dirección</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="estrategia"
                                options={optionsautoevaluacion}
                                value={values.estrategia}
                                onChange={(value) => handleInputChange("estrategia", value)}
                            />
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-xl w-full'>Operaciones</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="operaciones"
                                options={optionsautoevaluacion}
                                value={values.operaciones}
                                onChange={(value) => handleInputChange("operaciones", value)}
                            />
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-xl w-full'>Marketing</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="marketing"
                                options={optionsautoevaluacion}
                                value={values.marketing}
                                onChange={(value) => handleInputChange("marketing", value)}
                            />
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-xl w-full'>Ventas</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="ventas"
                                options={optionsautoevaluacion}
                                value={values.ventas}
                                onChange={(value) => handleInputChange("ventas", value)}
                            />
                        </div>
                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-xl w-full'>Talento Humano</p>
                            <SelectComponent
                                type={"Calificación..."}
                                Select="talentoHumano"
                                options={optionsautoevaluacion}
                                value={values.talentoHumano}
                                onChange={(value) => handleInputChange("talentoHumano", value)}
                            />
                        </div>

                    </div>
                    <div className="flex justify-start">
                        <button onClick={openModal} type='button' className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg">
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
