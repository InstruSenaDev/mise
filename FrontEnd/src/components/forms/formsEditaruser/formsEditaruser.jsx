import React, { useState, useEffect } from 'react';
import InputComponent from '../../inputs/input3/input3.jsx';
import SelectComponent from '../../inputs/selectores/selectores.jsx';
import ConfirmModal from '../../modales/modalconfirm';
import { Infouser } from '../../../helpers/edituser.js';
import { useParams } from 'react-router-dom';

/**
 * Componente `FormsEditaruser` que proporciona un formulario para editar la información de un usuario.
 * Incluye campos para nombre, apellidos, correo, celular, documento, contraseña, rol y programa.
 * Utiliza modales para confirmar la acción de guardar y mostrar un estado de éxito.
 * 
 * @returns {JSX.Element} El componente `FormsEditaruser`.
 */
export const FormsEditaruser = () => {

    const { id_usuario } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v2/usuario/${id_usuario}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
                setValues({
                    nombres: data.nombres,
                    estado: data.estado || "Activo",
                    apellidos: data.apellidos,
                    documento: data.documento,
                    correo: data.correo,
                    celular: data.celular,
                    contrasena: "", // Inicializar como vacío para no mostrar la contraseña
                    id_rol: data.id_rol,
                    programa: data.programa
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id_usuario]);

    const roles = [
        { value: '1', label: 'Superadmin' },
        { value: '2', label: 'Coordinador' },
        { value: '3', label: 'Pasante' },
    ];

    const programas = [
        { value: 'MISE - Fortalecimiento', label: 'MISE - Fortalecimiento' },
    ];

    // Estados para la visibilidad de modales, errores y éxito del formulario
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    // Estado para los valores del formulario
    const [values, setValues] = useState({
        nombres: "",
        estado: "Activo",
        apellidos: "",
        documento: "",
        correo: "",
        celular: "",
        contrasena: "",
        id_rol: "",
        programa: ""
    });

    // Manejo de cambios y validaciones aquí (omitido para brevedad)

    if (loading) {
        return <div>Cargando usuario...</div>; // Mensaje mientras se carga
    }

    if (error) {
        return <div>Error al cargar usuario: {error}</div>; // Mostrar error si hay uno
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    /**
     * Abre el modal de confirmación.
     */
    const openModal = () => setIsOpen(true);

    /**
     * Maneja los cambios en los campos de entrada del formulario y realiza validaciones.
     * 
     * @param {string} name - Nombre del campo de entrada.
     * @param {string} value - Valor ingresado en el campo.
     */
    const handleInputChange = (name, value) => {
        // Validaciones de campo específicas
        let error = "";

        // Validación para nombres y apellidos
        if (name === "nombres" || name === "apellidos") {
            if (/[^a-zA-Z\s]/.test(value)) {
                error = "No se permiten números ni caracteres especiales";
            }
        }

        // Validación para celular
        if (name === "celular") {
            if (value.length > 10) {
                error = "No se permite más de 10 dígitos";
            } else if (!/^\d*$/.test(value)) {
                error = "Solo se permiten números";
            } else if (value.length < 10) {
                error = "Debe tener mínimo 10 dígitos";
            }
        }

        // Validación para documento
        if (name === "documento") {
            if (value.length > 10) {
                error = "No se permite más de 10 dígitos";
            } else if (!/^\d*$/.test(value)) {
                error = "Solo se permiten números";
            } else if (value.length < 7) {
                error = "Debe tener mínimo 7 dígitos";
            }
        }

        // Validación de contraseña
        if (name === "contrasena") {
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                error = "Debe contener al menos una mayúscula, un número y un carácter especial";
            }
        }

        // Actualiza los valores y errores en el estado
        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: error,
        });
    };


    /**
     * Maneja el envío del formulario.
     * 
     * @param {Event} event - Evento del formulario.
     */
    const handleForm = async (event) => {
        event.preventDefault();
        closeModal();

        // Crea un objeto que contiene todos los campos del usuario
        const dataToSend = {
            ...user,
            ...values
        };

        // Omitir contrasena si no fue modificada
        if (!values.contrasena) {
            delete dataToSend.contrasena;
        }

        // Verificar el contenido de dataToSend
        console.log("Datos a enviar:", dataToSend);

        if (Object.keys(dataToSend).length > 0) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8000/api/v2/act-user/${id_usuario}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dataToSend),
                });

                // Comprobar la respuesta
                if (!response.ok) {
                    const errorData = await response.json(); // Obtiene el mensaje de error
                    throw new Error(`Error al actualizar el usuario: ${errorData.detail || 'Error desconocido'}`);
                }

                const result = await response.json();
                console.log("Resultado de la actualización:", result);
                openSuccessModal();
                window.location.reload();
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                setError(error.message);
            }
        } else {
            console.log("No se realizaron cambios en el formulario");
        }
    };

    /**
     * Abre el modal de éxito y lo cierra automáticamente después de 1 segundo.
     */
    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            setIsSuccessModalVisible(false);
        }, 5000); // 5 segundos
    };

    return (
        <>
            {/* Modal de confirmación */}
            <ConfirmModal isOpen={isOpen} closeModal={closeModal} handleConfirm={handleForm} />
            
            <form autoComplete='off' className="flex flex-col text-textBg w-full font-semibold gap-5 py-2 overflow-y-visible">
                <div className='flex xl:flex-row lg:flex-row flex-col gap-5'>
                    <div className='flex flex-col pl-3 font-semibold gap-5 py-4'>
                        {/* Campos de entrada para nombres, apellidos, correo */}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Nombre"
                            inputPlaceholder={user.nombres}
                            inputType="text"
                            height="h-12"
                            additionalClass="w-full"
                            name="nombres"
                            value={values.nombres}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        {errors.nombres && <p className="text-red">{errors.nombres}</p>}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Apellido"
                            inputPlaceholder={user.apellidos}
                            inputType="text"
                            height="h-12"
                            additionalClass="w-full"
                            name="apellidos"
                            value={values.apellidos}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        {errors.apellidos && <p className="text-red">{errors.apellidos}</p>}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Correo"
                            inputPlaceholder={user.correo}
                            inputType="email"
                            height="h-12"
                            additionalClass=""
                            name="correo"
                            value={values.correo}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        
                        {/* Selector de rol */}
                        <div className={`text-textBg items-center text-start content-center flex xl:flex-row lg:flex-row flex-col xl:gap-0 gap-2`}>
                            <div className="w-[10.5rem]">
                                <p className="font-semibold">Rol</p>
                            </div>
                            <div className='w-[12.8rem]'>
                                <SelectComponent
                                    name="id_rol"
                                    type="Rol..."
                                    options={roles}
                                    value={values.id_rol}
                                    onChange={(value) => handleInputChange("id_rol", value)}
                                    placeholder={user.id_rol}
                                />
                            </div>
                        </div>
                        
                        <div className='max-md:hidden xl:block'>
                            {/* Botón de guardar */}
                            <button
                                onClick={openModal}
                                className={`rounded-md bg-principalGreen text-white text-center font-semibold w-[6rem] h-10 p-2`}
                                type="button"
                            >
                                <p>Guardar</p>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col pl-3 font-semibold gap-5 py-4'>
                        {/* Campos de entrada para celular, documento, contraseña */}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Celular"
                            inputPlaceholder={user.celular}
                            inputType="number"
                            height="h-12"
                            additionalClass=""
                            name="celular"
                            value={values.celular}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        {errors.celular && <p className="text-red">{errors.celular}</p>}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Documento"
                            inputPlaceholder={user.documento}
                            inputType="number"
                            height="h-12"
                            additionalClass=""
                            name="documento"
                            value={values.documento}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        {errors.documento && <p className="text-red">{errors.documento}</p>}
                        <InputComponent
                            width="w-44"
                            widthInput="w-full"
                            DataType="Contraseña"
                            inputPlaceholder={"******"}
                            inputType="password"
                            height="h-12"
                            additionalClass=""
                            name="contrasena"
                            value={values.contrasena}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                        {errors.contrasena && <p className="text-red">{errors.contrasena}</p>}
                        
                        {/* Selector de programa */}
                        <div className={`text-textBg items-center text-start content-center flex xl:flex-row lg:flex-row flex-col xl:gap-0 gap-2`}>
                            <div className="w-[10.5rem]">
                                <p className="font-semibold">MISE</p>
                            </div>
                            <div className='w-[12.8rem]'>
                                <SelectComponent 
                                    name="programa" 
                                    type="Programa..." 
                                    options={programas} 
                                    value={values.programa} 
                                    onChange={(value) => handleInputChange("programa", value)} 
                                />
                            </div>
                        </div>
                        <div className="max-md:block xl:hidden lg:hidden">
                            {/* Botón de guardar para pantallas pequeñas */}
                            <button
                                onClick={openModal}
                                className={`rounded-md bg-principalGreen text-white text-center font-semibold w-[6rem] h-10 p-2`}
                                type="button"
                            >
                                <p>Guardar</p>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
            {/* Modal de éxito */}
            {isSuccessModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
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
};

export default FormsEditaruser;
