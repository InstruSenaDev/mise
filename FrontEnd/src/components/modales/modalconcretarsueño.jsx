import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modalcarga from "../modales/modalcarga/modalcarga";
import ModalInformativo from "../modales/modalexito";
import ConfirmModal from "../modales/modalconfirm";

// Componente Modal para concretar el sueño
const ModalConcretarSueno = ({ sueno, onClose }) => {
  const { nit } = useParams();
  const [estado, setEstado] = useState(0); // Estado inicial: "No"
  const [observaciones, setObservaciones] = useState(""); // Observaciones vacías
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const ConfirmModalOpen = () => {
    setIsConfirmModalOpen(true);
  };

  const ConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmAprobar = () => {
    concretarSueno(); // Aprobar tema
    setIsConfirmModalOpen(false); // Cerrar modal de confirmación
  };

  const concretarSueno = async () => {
    if (!sueno || !sueno.id) {
      console.error("Sueño no válido", sueno);
      return; // Asegurarse de que el sueño tiene una propiedad "id"
    }

    try {
      setLoading(true); // Mostrar el modal de carga
      const response = await fetch(
        `http://localhost:8000/api/v2/concretar-sueno/${sueno.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado, // Enviar el estado del sueño
            observaciones, // Enviar observaciones
            nit, // Enviar el NIT de la empresa asociada
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setLoading(false); // Ocultar el modal de carga en caso de error
        throw new Error("Error al concretar el sueño");
      }

      const data = await response.json();
      setLoading(false); // Ocultar el modal de carga
      console.log(data);
      setInfoMessage("Se ha concretado el sueño");
      setIsInfoModalOpen(true); // Mostrar modal informativo
    } catch (error) {
      setLoading(false); // Ocultar el modal de carga en caso de error
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInfoModalClose = () => {
    setIsInfoModalOpen(false);
    window.location.reload(); // Recargar la página al cerrar el modal informativo
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="rounded-lg p-6 w-96 shadow-lg bg-greyBlack">
          <h2 className="text-lg font-semibold text-white mb-4">
            Concretar Sueño
          </h2>
          <p className="text-white">
            <strong>Sueño:</strong> {sueno.sueño}
          </p>

          <label className="block text-white mt-4">
            ¿El sueño se concretó?
            <select
              value={estado}
              onChange={(e) => setEstado(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-600 rounded-md text-white bg-transparent pl-2"
            >
              <option value="0" className="text-black">
                No
              </option>
              <option value="1" className="text-black">
                Sí
              </option>
            </select>
          </label>

          <label className="block text-white mt-4">
            Observaciones:
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ingrese observaciones"
              className="mt-1 block w-full border border-gray-600 rounded-md text-white bg-transparent p-2"
              rows="4"
            />
          </label>

          <div className="flex justify-end mt-4">
            <button
              onClick={ConfirmModalOpen} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Concretar Sueño
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}  // Agrega el prop isOpen
          handleConfirm={handleConfirmAprobar}
          closeModal={ConfirmModalClose}
        />
      )}

      {/* Modal informativo */}
      {isInfoModalOpen && (
        <ModalInformativo
          mensaje={infoMessage}
          onClose={handleInfoModalClose} // Cerrar modal y recargar página
        />
      )}

      {/* Modal de carga */}
      {loading && <Modalcarga />}
    </>
  );
};

export default ModalConcretarSueno;
