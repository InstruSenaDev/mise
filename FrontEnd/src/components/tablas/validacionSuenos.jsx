import React, { useState } from "react";
import ModalConcretarSueno from "../modales/modalconcretarsueño";
import Modalcarga from "../modales/modalcarga/modalcarga";
import ModalInformativo from "../modales/modalexito";
import ConfirmModal from "../modales/modalconfirm";

// Estilos en JSX
const styles = {
  customScrollbar: {
    scrollbarWidth: "13px",
    scrollbarColor: "#888 #262b32",
  },
  customScrollbarTrack: {
    background: "#262b32",
    borderRadius: "12px",
  },
  customScrollbarThumb: {
    background: "#888",
    borderRadius: "10px",
  },
  customScrollbarThumbHover: {
    background: "#555",
  },
};

// Lista de colores para los bordes de las tarjetas de los sueños
const validacionDeSueños = [
  {
    bordeColor: "border-azulclaro",
  },
  {
    bordeColor: "border-fucsia",
  },
  {
    bordeColor: "border-amarillo",
  },
];

// Componente principal
const ValidacionDeSueños = ({ diagnosticos }) => {
  const [suenoSeleccionado, setSuenoSeleccionado] = useState(null);

  // Obtener la lista de todos los sueños de los diagnósticos
  const suenos = diagnosticos.flatMap((diagnostico) => diagnostico.suenos);

  return (
    <div
      className="p-4 bg-greyBlack xl:w-[45rem] lg:w-[35rem] text-white rounded-lg"
      style={styles.customScrollbar}
    >
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">🌥️</span>
        <h2 className="text-lg font-semibold">Validación de sueños</h2>
      </div>

      {suenos.length === 0 ? (
        // Si no hay sueños, mostrar un mensaje indicándolo
        <p className="text-center flex align-middle text-xl items-center justify-center text-white">
          Todos los sueños ya se encuentran validados
        </p>
      ) : (
        // Mostrar los sueños en un layout de cuadrícula
        <div
          className="grid gap-5 xl:max-h-[30rem] lg:max-h-[30rem] overflow-y-auto"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            ...styles.customScrollbar,
          }}
        >
          {suenos.map((sueno, index) => (
            <div
              key={index}
              className={`flex justify-center items-center bg-transparent border-l-4 ${
                validacionDeSueños[index % validacionDeSueños.length]
                  ?.bordeColor
              } rounded-md p-4 text-center text-white h-40 sm:h-48 md:h-56 cursor-pointer`}
              onClick={() => setSuenoSeleccionado(sueno)} // Abrir modal para concretar el sueño
            >
              <p>{sueno.sueño}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal para concretar el sueño */}
      {suenoSeleccionado && (
        <ModalConcretarSueno
          sueno={suenoSeleccionado} // Pasar el sueño seleccionado
          onClose={() => setSuenoSeleccionado(null)} // Cerrar modal
        />
      )}
    </div>
  );
};

export default ValidacionDeSueños;
