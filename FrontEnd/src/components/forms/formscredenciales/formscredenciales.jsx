import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './formscredenciales.css';

/**
 * Componente `Formscredenciales` para la gestión de credenciales de usuario, 
 * permitiendo cambiar la contraseña y validar el formulario.
 * 
 * @returns {JSX.Element} El componente `Formscredenciales`.
 */
const Formscredenciales = () => {
    const { uid, token } = useParams();
    const [errors, setErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [values, setValues] = useState({ contrasena: '', confirmcontrasena: '' }); // Inicializar el estado

    /**
     * Maneja el cambio de valor de los campos del formulario.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event - El evento de cambio del campo.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/; // Mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.

        if (!values.contrasena) {
            newErrors.contrasena = "La contraseña es obligatoria.";
        } else if (!passwordRegex.test(values.contrasena)) {
            newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.";
        }

        if (values.contrasena !== values.confirmcontrasena) {
            newErrors.confirmcontrasena = "Las contraseñas no coinciden.";
        }

        return newErrors;
    };

    const handleForm = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Establece los errores de validación
            setIsModalVisible(true); // Muestra el modal de errores
        } else {
            try {
                const response = await fetch('http://localhost:8000/api/v2/set-password/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uid: uid,
                        token: token,
                        new_password: values.contrasena,
                        confirm_password: values.confirmcontrasena,
                    }),
                });

                if (response.ok) {
                    setSuccessMessage("Contraseña cambiada exitosamente.");
                    setValues({ contrasena: "", confirmcontrasena: "" });
                    // Aquí puedes redirigir a otra página si lo deseas
                    window.location.href = '/';

                } else {
                    const errorData = await response.json();
                    setErrors(errorData);

                    if (errorData.error && errorData.error.token) {
                        alert('El token es inválido o ha expirado. Redirigiendo...');
                        window.location.href = '/expiracion';
                    } else {
                        setIsModalVisible(true);
                    }
                }
            } catch (error) {
                console.error("Error al cambiar la contraseña:", error);
            }
        }
    };

    /**
     * Cierra el modal de errores.
     */
    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <form onSubmit={handleForm} className="form flex flex-col gap-2 ">
                <p className="text-left w-full">Nueva contraseña</p>
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border`}
                    type="password"
                    value={values.contrasena}
                    name="contrasena"
                    placeholder="Ingrese su nueva contraseña"
                    autoComplete="off"
                    onChange={handleInputChange}
                />
                <p className="text-left w-full">Confirma contraseña</p>
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border`}
                    type="password"
                    value={values.confirmcontrasena}
                    name="confirmcontrasena"
                    placeholder="Confirme su contraseña"
                    autoComplete="off"
                    onChange={handleInputChange}
                />
                <div>
                    <div className="flex justify-center">
                        <button
                            className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg hover:bg-white hover:text-principalGreen"
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <p className="text-xl text-center w-full">Cancelar</p>
                    </div>
                </div>
            </form>

            {/* Modal para mostrar los errores */}
            {isModalVisible && (
                <div className={`modal-container show`}>
                    <div className="modal-header">
                        <h2 className="text-xl font-bold">Errores de validación</h2>
                        <button className="close-button" onClick={closeModal}>X</button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {Object.values(errors).map((error, index) => (
                                <li key={index} className="text-red">{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className={`modal-container show`}>
                    <div className="modal-header">
                        <h2 className="text-xl font-bold">Éxito</h2>
                        <button className="close-button" onClick={() => setSuccessMessage('')}>X</button>
                    </div>
                    <div className="modal-body">
                        <p className="text-green">¡Se ha cambiado la contraseña!</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Formscredenciales;
