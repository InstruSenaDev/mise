import React, { useState } from "react";
import './formslogin.css';
import ModalLogIn from '../../modales/modalis.jsx';

/**
 * Componente `Form` para el inicio de sesión.
 * Permite a los usuarios ingresar su correo y contraseña para iniciar sesión.
 * Incluye validación del formulario y modales para mostrar errores y confirmaciones.
 * 
 * @returns {JSX.Element} El componente `Form`.
 */
const Form = () => {
    // Estados para mostrar/ocultar la contraseña, valores del formulario, y mensajes de error
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        correo: "",
        contrasena: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalisVisible, setIsModalIsVisible] = useState(false);
    const [nombres, setNombres] = useState('');  // Estado para almacenar los nombres

    /**
     * Maneja los cambios en los campos de entrada del formulario.
     * 
     * @param {Event} event - Evento del formulario.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });

        // Limpiar el mensaje de error al cambiar el valor del input
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    /**
     * Valida los valores del formulario.
     * 
     * @returns {Object} Objeto con errores de validación.
     */
    const validateForm = () => {
        const newErrors = {};
        if (!values.correo) {
            newErrors.correo = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(values.correo)) {
            newErrors.correo = "El correo electrónico no es válido.";
        }

        if (!values.contrasena) {
            newErrors.contrasena = "La contraseña es obligatoria.";
        } else if (values.contrasena.length < 6) {
            newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
        }

        return newErrors;
    };

    // Manejador del formulario
    const handleForm = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsModalVisible(true);
            return; // Salir si hay errores de validación
        }
    
        try {
            const response = await fetch("http://localhost:8000/api/v2/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
    
            const data = await response.json();
            if (response.ok) {
                setNombres(data.data.nombres);
                setIsModalIsVisible(true);
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                setErrorMessage(''); // Limpiar mensaje de error al hacer login exitoso
                localStorage.setItem('userData', JSON.stringify(data.data));
            } else {
                if (data.error) {
                    setErrorMessage(data.error); // Almacenar el mensaje de error
                }
                console.log("Error al iniciar sesión:", data);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setErrorMessage('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    

    /**
     * Alterna la visibilidad de la contraseña.
     */
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    /**
     * Cierra el modal de errores.
     */
    const closeModal = () => {
        setIsModalVisible(false);
    };

    /**
     * Cierra el modal de éxito y redirige al dashboard.
     */
    const closeModalis = () => {
        setIsModalIsVisible(false);
        window.location.href = "/dashboard";
    };

    return (
        <div className="w-full p-4">
            {/* Mensaje de error general */}
            {errorMessage && (
                <div className="bg-red text-black p-4 rounded mb-4 text-sm md:text-base">
                    {errorMessage}
                </div>
            )}
            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleForm} className="form flex flex-col gap-4 md:gap-6">
                <input
                    className={`w-full rounded-lg caret-white bg-transparent text-white peer border p-3 md:p-5 text-sm md:text-lg font-normal outline-none transition-all placeholder-shown:border ${errors.correo ? 'border-red' : 'border-white'}`}
                    type="email"
                    value={values.correo}
                    name="correo"
                    placeholder="Ingrese su correo"
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <input
                    className={`w-full rounded-lg caret-white bg-transparent text-white peer border p-3 md:p-5 text-sm md:text-lg font-normal outline-none transition-all placeholder-shown:border ${errors.contrasena ? 'border-red' : 'border-white'}`}
                    type={showPassword ? "text" : "password"}
                    value={values.contrasena}
                    name="contrasena"
                    placeholder="Ingrese su contraseña"
                    onChange={handleInputChange}
                />

                <div className="flex flex-row md:flex-row gap-2 items-center md:items-center justify-between">
                    <div className="flex items-center">
                        <input
                            className="border border-solid checked:bg-principalGreen border-principalGreen h-5 w-5 mr-2"
                            type="checkbox"
                            name="showpassword"
                            id="showpassword"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        <label htmlFor="showpassword" className="text-sm md:text-base">Mostrar contraseña</label>
                    </div>
                    <div>
                        <a href="/olvidaste-contraseña" className="text-sm md:text-base hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        id="login-button"
                        className="bg-principalGreen px-4 md:px-6 py-2 font-bold text-lg md:text-2xl rounded-lg transition-all hover:bg-opacity-90"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>

            {/* Modal de errores */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-red rounded-lg p-6 max-w-sm w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Errores de validación</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            <ul>
                                {Object.values(errors).map((error, index) => (
                                    <li key={index} className="text-white mb-2">
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de éxito */}
            <ModalLogIn
                isOpen={isModalisVisible && nombres}
                onConfirm={closeModalis}
                nombre={nombres || ''}
            />
        </div>
    );
};

export default Form;
