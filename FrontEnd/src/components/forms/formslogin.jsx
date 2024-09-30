import React, { useState } from "react";

const Form = () => {

    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({}); // Estado para almacenar errores

    // Estado para almacenar los valores de los inputs
    const [values, setValues] = useState({
        correo: "",
        contrasena: "",
    });

    // Función para manejar cambios en los inputs de texto
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Validación de correo electrónico
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validación de contraseñas (mínimo 8 caracteres, incluyendo números y caracteres especiales)
    const validatePassword = (password) => {
        return password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
    };

    // Validaciones en el envío del formulario
    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!values.correo) {
            newErrors.correo = "El correo es requerido.";
            valid = false;
        } else if (!validateEmail(values.correo)) {
            newErrors.correo = "Formato de correo inválido.";
            valid = false;
        }

        if (!values.contrasena) {
            newErrors.contrasena = "La contraseña es requerida.";
            valid = false;
        } else if (!validatePassword(values.contrasena)) {
            newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Función para manejar el envío del formulario
    const handleForm = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        if (!validateForm()) {
            return; // Si la validación falla, no enviar el formulario
        }

        console.log("Inputs value:", values);

        try {
            // Realiza la solicitud POST para iniciar sesión
            const response = await fetch("http://localhost:8000/api/v2/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values), // Convierte los valores del formulario a JSON
            });

            const data = await response.json(); // Convierte la respuesta a JSON

            if (response.ok) {
                console.log("Login con éxito:", data);
                // Considerar si almacenar los tokens en sessionStorage en lugar de localStorage por mayor seguridad
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                // Redirigir o cargar datos del usuario
            } else {
                console.log("Error al iniciar sesión:", data);
                setErrors({ server: "Error al iniciar sesión. Por favor, verifica tus credenciales." });
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setErrors({ server: "Error en la comunicación con el servidor. Inténtalo más tarde." });
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Alterna el estado de visibilidad de la contraseña
    };

    return (
        <>
            <form onSubmit={handleForm} className="form flex flex-col gap-6">
                {/* Input de correo */}
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.correo ? "border-red-500" : ""
                        }`}
                    type="email"
                    value={values.correo}
                    name="correo"
                    placeholder="Ingrese su correo"
                    autoComplete="off"
                    onFocus={(e) => e.target.removeAttribute("readonly")}
                    readOnly
                    onChange={handleInputChange}
                />
                {errors.correo && <p className="text-red-500">{errors.correo}</p>}

                {/* Input de contraseña */}
                <input
                    className={`h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white ${errors.contrasena ? "border-red-500" : ""
                        }`}
                    type={showPassword ? "text" : "password"}
                    value={values.contrasena}
                    name="contrasena"
                    placeholder="Ingrese su contraseña"
                    onFocus={(e) => e.target.removeAttribute("readonly")}
                    readOnly
                    onChange={handleInputChange}
                />
                {errors.contrasena && <p className="text-red-500">{errors.contrasena}</p>}

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex h-7">
                        <input
                            className="border border-solid checked:bg-principalGreen border-principalGreen h-full w-8"
                            type="checkbox"
                            name="showpassword"
                            id="3"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        <p className="text-xl">Mostrar contraseña</p>
                    </div>
                    <div className="h-7">
                        <a href="/olvidasteContraseña/olvidasteContraseña" className="text-xl hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>

                {/* Mostrar error del servidor si ocurre */}
                {errors.server && <p className="text-red-500">{errors.server}</p>}

                <div className="flex justify-center">
                    <button
                        id="login-button"
                        className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
