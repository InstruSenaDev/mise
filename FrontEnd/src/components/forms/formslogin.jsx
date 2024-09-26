import React, { useState } from "react";

const Form = () => {

    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

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

    // Función para manejar el envío del formulario
    const handleForm = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        console.log("Inputs value:", values); // Imprime los valores de los inputs en la consola

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
                console.log("Login con éxito:", data); // Imprime el éxito en la consola
                // Almacena los tokens en el localStorage
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                // Redirigir o cargar datos del usuario
            } else {
                console.log("Error al iniciar sesión:", data); // Imprime el error en la consola
            }
        } catch (error) {
            console.error("Error en la solicitud:", error); // Imprime cualquier error en la consola
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Alterna el estado de visibilidad de la contraseña
    };

    return (
        <>
            <form onSubmit={handleForm} className="form flex flex-col gap-6">
                <input 
                    className="h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white" 
                    type="email" 
                    value={values.correo} 
                    name="correo" 
                    placeholder="Ingrese su correo..." 
                    autoComplete="off" 
                    onFocus={(e) => e.target.removeAttribute('readonly')} // Evitar autocompletado usando readonly
                    readOnly 
                    onChange={handleInputChange} 
                />
                <input 
                    onFocus={(e) => e.target.removeAttribute('readonly')} 
                    readOnly 
                    className="h-full w-full rounded-lg caret-white bg-transparent text-white peer border p-5 font-sans text-lg font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white" 
                    type={showPassword ? "text" : "password"} 
                    value={values.contrasena} 
                    name="contrasena" 
                    placeholder="Ingrese su contraseña..." 
                    onChange={handleInputChange} 
                />

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
                        <a href="/olvidasteContraseña/olvidasteContraseña" className="text-xl hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        id="login-button"
                        className="bg-principalGreen px-6 py-2 font-bold text-2xl rounded-lg"
                        type="submit">
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
