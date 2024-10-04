/**
 * DetalleEmpresas.jsx
 * 
 * Componente principal para la página de detalle de empresas dentro del panel de administración.
 * Este componente utiliza un layout general y muestra la información detallada de las empresas
 * con la opción de aceptar las solicitudes.
 * 
 * Componentes utilizados:
 * - LayoutDashboard: Estructura principal del dashboard, incluye la barra lateral y el diseño global.
 * - GoBack: Componente que proporciona un botón para volver a la página anterior con texto personalizado.
 * - DeveloperPortal: Componente que maneja la lógica y la tabla de empresas que están pendientes de aceptación.
 * 
 * Funcionalidad:
 * - Muestra una estructura clara con encabezados y una tabla de empresas que esperan ser aceptadas.
 * - Proporciona una interfaz de usuario consistente con el estilo del dashboard, utilizando Tailwind CSS para el diseño.
 * 
 * Estilos:
 * - Usa Tailwind CSS para la disposición y el diseño, garantizando que el contenido esté bien organizado.
 * - El fondo de la página utiliza colores definidos en las clases personalizadas (bg-greyBg y bg-greyBlack).
 * - El componente es completamente responsivo y se ajusta a diferentes tamaños de pantalla.
 */

import React from 'react';
import DeveloperPortal from './aceptaremp';
import LayoutDashboard from '../../layouts/LayoutDashboard';
import GoBack from '../../components/inputs/goback/GoBack';

const DetalleEmpresas = () => {
  return (
    <LayoutDashboard title="Aceptar Empresa">
      <main className="bg-greyBg w-full h-screen overflow-x-hidden">
        <div className="flex flex-col w-full h-full">
          <div className="bg-greyBlack h-20 w-full">
          </div>
          <div className="bg-greyBg flex flex-col px-6 py-6 h-full w-full overflow-y-auto">
            <GoBack text="Informacion Empresas" />
            <DeveloperPortal />
          </div>
        </div>
      </main>
    </LayoutDashboard>
  );
};

export default DetalleEmpresas;
