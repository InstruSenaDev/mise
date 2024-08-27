import React, { useState } from "react";
import SelectComponent from "../../inputs/selectores/selectores.jsx";
import './formsregistro.css';

export const FormRegistro = () => {

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        ndocumento: "",
        correo: "",
        celular: "",
        genero: "",
        ciudad: "",
        educacion: "",
        cargo: "",
        TyC: false,
    });
    
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
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleInputChange = (name, value) => {
        if (name === "nombre" || name === "apellido") {
            // Filtrar caracteres no permitidos para nombre y apellido
            value = value.replace(/[0-9]/g, "");
        }
        if (name === "celular") {
            if (value.length > 10) {
                return; // Evitar que se ingrese más de 10 dígitos
            }
        }
        if (name === "ndocumento") {
            if (value.length > 10) {
                return; // Evitar que se ingrese más de 10 dígitos
            }
        }
        setValues({
            ...values,
            [name]: value,
        });
    }

    const validateForm = () => {
        const newErrors = {};

        if (!values.nombre) {
            newErrors.nombre = "El nombre es obligatorio.";
        }

        if (!values.apellido) {
            newErrors.apellido = "El apellido es obligatorio.";
        }

        if (!values.documento) {
            newErrors.documento = "Debe seleccionar un tipo de documento.";
        }

        if (!values.ndocumento) {
            newErrors.ndocumento = "El número de documento es obligatorio.";
        } else if (values.ndocumento.length < 6) {
            newErrors.ndocumento = "El número de documento debe tener al menos 6 caracteres.";
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

        if (!values.ciudad) {
            newErrors.ciudad = "Debe seleccionar una ciudad.";
        }

        if (!values.cargo) {
            newErrors.cargo = "Debe seleccionar su cargo en la empresa.";
        }

        if (!values.TyC) {
            newErrors.TyC = "Debe aceptar los términos y condiciones.";
        }

        return newErrors;
    }
    const closeModal = () => {
        setIsModalVisible(false);
    }

    


    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // Aquí redirigimos usando `window.location`
            window.location.href = '/registroEmpresa/registroEmpresa';
        } else {
            setErrors(validationErrors);
            setIsModalVisible(true);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="form w-[45rem] flex flex-col gap-6 bg-greyBlack p-3 rounded-xl">
                <div className="flex flex-row w-full gap-5">
                    <input
                        className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.nombre ? 'border-red-500' : ''}`}
                        type="text"
                        value={values.nombre || ''}
                        name="nombre"
                        placeholder="Ingrese su nombre..."
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                    <input
                        className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.apellido ? 'border-red-500' : ''}`}
                        type="text"
                        value={values.apellido || ''}
                        name="apellido"
                        placeholder="Ingrese su apellido..."
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type={"Tipo de Documento..."}
                        Select="documento"
                        options={optionsdocu}
                        value={values.documento || ''}
                        onChange={(value) => handleInputChange("documento", value)}
                        className={`${errors.documento ? 'border-red' : ''}`}
                    />
                    <input
                        className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.ndocumento ? 'border-red-500' : ''}`}
                        type="number"
                        value={values.ndocumento || ''}
                        name="ndocumento"
                        placeholder="Ingrese su número de documento..."
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.correo ? 'border-red-500' : ''}`}
                    type="email"
                    value={values.correo || ''}
                    name="correo"
                    placeholder="Ingrese su correo..."
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.celular ? 'border-red-500' : ''}`}
                    type="number"
                    value={values.celular || ''}
                    name="celular"
                    placeholder="Ingrese su número de celular..."
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type={"Genero..."}
                        Select="genero"
                        options={optionsgender}
                        value={values.genero || ''}
                        onChange={(value) => handleInputChange("genero", value)}
                        className={`${errors.genero ? 'border-red-500' : ''}`}
                    />
                    <SelectComponent
                        type={"Ciudad..."}
                        Select="ciudad"
                        options={optionscity}
                        value={values.ciudad || ''}
                        onChange={(value) => handleInputChange("ciudad", value)}
                        className={`${errors.ciudad ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="flex flex-row w-full gap-5">
                    <SelectComponent
                        type={"Educación Superior..."}
                        Select="educacion"
                        options={optionseducacion}
                        value={values.educacion || ''}
                        onChange={(value) => handleInputChange("educacion", value)}
                    />
                    <SelectComponent
                        type={"Cargo en la empresa..."}
                        Select="cargo"
                        options={optionscargo}
                        value={values.cargo || ''}
                        onChange={(value) => handleInputChange("cargo", value)}
                    />
                </div>
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