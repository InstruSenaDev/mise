import React, { useState } from "react";
import SelectComponent from "../../inputs/selectores/selectores.jsx";
import './formsregistro.css';

export const FormRegistro = () => {
    // Estado para manejar los valores del formulario
    const [values, setValues] = useState({
        nombres_postulante: "",
        apellidos_postulante: "",
        tipo_documento: "",
        no_documento: "",
        correo: "",
        celular: "",
        genero: "",
        municipio: "",
        educacion: "",
        cargo: "",
        id_rol: 4,
        TyC: false,
    });

    // Estado para manejar los errores de validación
    const [errors, setErrors] = useState({});
    // Estado para controlar la visibilidad del modal de errores
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Opciones para los selectores
    const optionsdocu = [
        { value: 'Cedula de Ciudadania', label: 'Cedula de Ciudadania' },
        { value: 'Cedula de Extranjeria', label: 'Cedula de Extranjeria' },
        { value: 'Permiso Especial de Permanencia', label: 'Permiso Especial de Permanencia' },
    ];

    const optionscargo = [
        { value: 'Representante legal', label: 'Representante legal' },
        { value: 'Gerente', label: 'Gerente' },
        { value: 'Jefe / Director', label: 'Jefe / Director' },
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Colaborador', label: 'Colaborador' },
    ];

    const optionsgender = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
        { value: 'Prefiero no decirlo', label: 'Prefiero no decirlo' },
    ];

    const optionscity = [
        { value: 'Palmira', label: 'Palmira' },
        { value: 'Florida', label: 'Florida' },
        { value: 'Pradera', label: 'Pradera' },
        { value: 'Candelaria', label: 'Candelaria' },
    ];

    const optionseducacion = [
        { value: 'Bachiller', label: 'Bachiller' },
        { value: 'Tecnico', label: 'Tecnico' },
        { value: 'Maestria', label: 'Maestria' },
    ];

    /**
     * Maneja los cambios en los campos de entrada.
     * 
     * @param {string} name - El nombre del campo de entrada.
     * @param {string|number|boolean} value - El nuevo valor del campo de entrada.
     */
    const handleInputChange = (name, value) => {
        if (name === "nombres_postulante" || name === "apellidos_postulante") {
            value = value.replace(/[0-9]/g, "");
        }
        if (name === "celular" || name === "no_documento") {
            if (value.length > 10) return; // Limitar a 10 dígitos
        }
        setValues({
            ...values,
            [name]: value,
        });
    };

    /**
     * Valida los campos del formulario y devuelve un objeto de errores.
     * 
     * @returns {Object} - Objeto con los errores de validación.
     */
    const validateForm = () => {
        const newErrors = {};

        if (!values.nombres_postulante) {
            newErrors.nombres_postulante = "El nombre es obligatorio.";
        }

        if (!values.apellidos_postulante) {
            newErrors.apellidos_postulante = "El apellido es obligatorio.";
        }

        if (!values.tipo_documento) {
            newErrors.tipo_documento = "Debe seleccionar un tipo de documento.";
        }

        if (!values.no_documento) {
            newErrors.no_documento = "El número de documento es obligatorio.";
        } else if (values.no_documento.length < 6) {
            newErrors.no_documento = "El número de documento debe tener al menos 6 caracteres.";
        }

        if (!values.correo) {
            newErrors.correo = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(values.correo)) {
            newErrors.correo = "El correo electrónico no es válido.";
        }

        if (!values.celular) {
            newErrors.celular = "El número de celular es obligatorio.";
        } else if (values.celular.length < 10) {
            newErrors.celular = "El número de celular debe tener al menos 10 dígitos.";
        }

        if (!values.genero) {
            newErrors.genero = "Debe seleccionar un género.";
        }

        if (!values.municipio) {
            newErrors.municipio = "Debe seleccionar una ciudad.";
        }

        if (!values.cargo) {
            newErrors.cargo = "Debe seleccionar su cargo en la empresa.";
        }

        if (!values.TyC) {
            newErrors.TyC = "Debe aceptar los términos y condiciones.";
        }

        return newErrors;
    };

    /**
     * Cierra el modal de errores.
     */
    const closeModal = () => {
        setIsModalVisible(false);
    };

    /**
     * Maneja el envío del formulario. Valida los datos y envía una solicitud de registro.
     * 
     * @param {Event} event - El evento de envío del formulario.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            const postulanteData = {
                nombres_postulante: values.nombres_postulante,
                apellidos_postulante: values.apellidos_postulante,
                tipo_documento: values.tipo_documento,
                no_documento: values.no_documento,
                correo: values.correo,
                celular: values.celular,
                genero: values.genero,
                municipio: values.municipio,
                educacion: values.educacion,
                cargo: values.cargo,
                id_rol: values.id_rol
            };

            fetch('http://localhost:8000/api/v2/registro-postulante/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postulante: postulanteData }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id_postulante) {
                        localStorage.setItem('id_postulante', data.id_postulante);
                        window.location.href = '/registro-empresa';
                    } else {
                        console.error('Error en el registro del postulante:', data);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar los datos del postulante:', error);
                });
        } else {
            setErrors(validationErrors);
            setIsModalVisible(true);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="form custom-scrollbar w-full xl:max-h-full max-h-[21rem] md:max-h-full overflow-y-auto flex flex-col gap-6 bg-greyBlack p-6 md:p-10 rounded-xl mx-auto"
            >
                <h1 className="font-bold text-xl">Todos los campos son requeridos.</h1>
                {/* Campos de nombre y apellido */}
                <div className="flex flex-row w-full gap-5">
                    <input
                        className={`h-full lg:h-[3.5rem] pr-8 w-full rounded-lg caret-white bg-transparent text-white peer border px-2 py-2.5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.nombres_postulante ? 'border-red-500' : ''}`}
                        type="text"
                        value={values.nombres_postulante || ''}
                        name="nombres_postulante"
                        placeholder="Ingrese su nombre"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                    <input
                        className={`h-full lg:h-[3.5rem] pr-8 w-full rounded-lg caret-white bg-transparent text-white peer border px-2 py-2.5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.apellidos_postulante ? 'border-red-500' : ''}`}
                        type="text"
                        value={values.apellidos_postulante || ''}
                        name="apellidos_postulante"
                        placeholder="Ingrese su apellido"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>

                {/* Campos de tipo de documento y número de documento */}
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type="Tipo de documento"
                        Select="tipo_documento"
                        options={optionsdocu}
                        value={values.tipo_documento || ''}
                        onChange={(value) => handleInputChange("tipo_documento", value)}
                        className={`${errors.tipo_documento ? 'border-red-500' : ''}`}
                    />
                    <input
                        className={`h-full lg:h-[3.5rem] pr-8 w-full rounded-lg caret-white bg-transparent text-white peer border px-2 py-2.5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.no_documento ? 'border-red-500' : ''}`}
                        type="number"
                        value={values.no_documento || ''}
                        name="no_documento"
                        placeholder="Ingrese su número de documento"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>

                {/* Campos de correo electrónico y celular */}
                <div className="flex flex-row w-full gap-5">
                    <input
                        className={`h-full lg:h-[3.5rem] pr-8 w-full rounded-lg caret-white bg-transparent text-white peer border px-2 py-2.5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.correo ? 'border-red-500' : ''}`}
                        type="email"
                        value={values.correo || ''}
                        name="correo"
                        placeholder="Ingrese su correo"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                    <input
                        className={`h-full lg:h-[3.5rem] pr-8 w-full rounded-lg caret-white bg-transparent text-white peer border px-2 py-2.5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.celular ? 'border-red-500' : ''}`}
                        type="number"
                        value={values.celular || ''}
                        name="celular"
                        placeholder="Ingrese su número de celular"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                {/* Campos de género y municipio */}
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type="Género"
                        Select="genero"
                        options={optionsgender}
                        value={values.genero || ''}
                        onChange={(value) => handleInputChange("genero", value)}
                        className={`${errors.genero ? 'border-red-500' : ''}`}
                    />
                    <SelectComponent
                        type="Municipio"
                        Select="municipio"
                        options={optionscity}
                        value={values.municipio || ''}
                        onChange={(value) => handleInputChange("municipio", value)}
                        className={`${errors.municipio ? 'border-red-500' : ''}`}
                    />
                </div>

                {/* Campos de educación y cargo */}
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type="Educación Superior"
                        Select="educacion"
                        options={optionseducacion}
                        value={values.educacion || ''}
                        onChange={(value) => handleInputChange("educacion", value)}
                    />
                    <SelectComponent
                        type="Cargo en la empresa"
                        Select="cargo"
                        options={optionscargo}
                        value={values.cargo || ''}
                        onChange={(value) => handleInputChange("cargo", value)}
                    />
                </div>

                {/* Aceptación de términos y condiciones */}
                <div className="flex h-8 gap-2 items-center justify-start">
                    <input
                        className={`border-2 border-solid ${errors.TyC ? 'border-red-500' : 'border-principalGreen'} h-full w-8`}
                        type="checkbox"
                        name="TyC"
                        id="TyC"
                        checked={values.TyC || false}
                        onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
                    />
                    <p className="text-xl">Acepto términos y condiciones</p>
                </div>

                {/* Botón de envío */}
                <div className="flex justify-center">
                    <button
                        className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg"
                        type="submit"
                    >
                        Siguiente
                    </button>
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
                        onClick={closeModal}
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
