import React, { useState } from 'react';
import './formsrecupcont.css'; // Importa el archivo de estilos CSS para el componente

const Formsrecupcont = () => {
    // Estado para almacenar errores de validación
    const [errors, setErrors] = useState({});
    // Estado para controlar la visibilidad del modal de errores
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [attempts, setAttempts] = useState(0); // Contador para limitar intentos de fuerza bruta

    const [values, setValues] = useState({
        correo: "",
    });

    // Validar correo electrónico y evitar fuerza bruta (ejemplo: max 5 intentos)
    const validateForm = () => {
        const newErrors = {};
        if (attempts >= 5) {
            newErrors.general = "Se han alcanzado el número máximo de intentos. Intente nuevamente más tarde.";
        } else if (!values.correo) {
            newErrors.correo = "El correo electrónico es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
            newErrors.correo = "El correo electrónico no es válido.";
        }
        return newErrors;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value.trim(), // Eliminar espacios innecesarios
        });
    };

    // Función para manejar el envío del formulario
    const handleForm = async (event) => {
        event.preventDefault(); // Detener la acción por defecto del formulario
        const validationErrors = validateForm(); // Validar el formulario
        if (Object.keys(validationErrors).length > 0) { // Verificar si hay errores de validación
            setErrors(validationErrors); // Establecer los errores
            setIsModalVisible(true); // Mostrar el modal
            return; // Detener el envío del formulario
        }

        setAttempts(attempts + 1); // Incrementar el contador de intentos

        try {
            const response = await fetch('https://tuservidorseguro.com/api/v2/password-reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: values.correo }),
            });

            if (response.ok) {
                // Redireccionar a la página de correo enviado
                window.location.href = '/correo-enviado';
            } else {
                const data = await response.json();
                setErrors({ correo: data.error || 'Ocurrió un error al enviar el correo: No existe un correo asociado.' });
                setIsModalVisible(true);
            }
        } catch (error) {
            setErrors({ correo: 'Error al conectar con el servidor.' });
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        window.location.href = '/login';
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="w-full p-4">
            {/* Formulario de recuperación de contraseña */}
            <form onSubmit={handleForm} className="form flex flex-col space-y-6">
                <div>
                    {/* Campo de entrada para el correo electrónico */}
                    <label htmlFor="correo" className="block text-left w-full pb-2 text-sm font-medium text-white">
                        Correo electrónico
                    </label>
                    <input
                        id="correo"
                        className="h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-3 sm:p-4 font-sans text-sm sm:text-base font-normal outline-none transition-all placeholder-shown:border focus:border-principalGreen"
                        type="email"
                        value={values.correo}
                        name="correo"
                        placeholder="Ingrese su correo"
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-4">
                    {/* Botón para enviar el formulario */}
                    <button
                        type='submit'
                        className="w-full bg-principalGreen px-4 py-2 font-bold text-lg sm:text-xl rounded-lg hover:bg-white hover:text-principalGreen transition-colors duration-300"
                    >
                        Pedir enlace para restablecer contraseña
                    </button>
                    {/* Botón para cancelar */}
                    <button
                        onClick={handleCancel}
                        className="w-full text-white text-base sm:text-lg hover:underline cursor-pointer"
                        type="button"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            {/* Modal para mostrar los errores de validación */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-black">Errores de validación</h2>
                            <button
                                className="text-red hover:text-red"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </div>
                        <ul className="list-disc pl-5 space-y-2">
                            {Object.values(errors).map((error, index) => (
                                <p key={index} className="text-red">
                                    {error}
                                </p>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formsrecupcont;
