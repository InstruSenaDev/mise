/**
 * Autoevaluacion.jsx
 * 
 * Componente que presenta una página de autoevaluación dentro del dashboard, donde el usuario puede
 * obtener información sobre el programa MISE y completar un formulario de autoevaluación.
 * 
 * Componentes utilizados:
 * - LayoutDashboard: Estructura principal del dashboard que incluye la barra lateral y el título de la página.
 * - FormAuto: Componente del formulario de autoevaluación para la formación empresarial.
 * 
 * Funcionalidad:
 * - Muestra información detallada sobre el programa MISE, explicando sus beneficios y las áreas empresariales
 *   que cubre. 
 * - Proporciona un enlace para conocer más detalles sobre el programa MISE en un sitio externo.
 * - Integra un formulario de autoevaluación para que el usuario pueda determinar si el programa MISE
 *   es adecuado para sus necesidades empresariales.
 * 
 * Estilos:
 * - Usa una combinación de estilos en línea (JSX) y Tailwind CSS para asegurar una disposición adecuada y
 *   una apariencia moderna.
 * - El contenedor principal tiene un fondo oscuro y el contenido se centra vertical y horizontalmente.
 * - Las tarjetas de información están estilizadas con bordes redondeados y espaciado adecuado, mientras
 *   que la tipografía resalta la información importante.
 */

import React from 'react';
import LayoutDashboard from "../../layouts/LayoutDashboard";
import FormAuto from "../../components/forms/formsautoevaluacion/formsautoevaluacion";

// Estilos en JSX
const containerStyle = {
  backgroundColor: '#262b32', // Estilo de fondo
  color: '#ffffff', // Color de texto
};

const cardStyle = {
  borderRadius: '16px', // Bordes redondeados
  padding: '2rem', // Espaciado interior
};

const Autoevaluacion = () => {
  return (
      <main
        className="flex flex-col w-full bg-greyBlack min-h-screen text-white justify-center"
        style={containerStyle}
      >
        <div
          className="bg-greyBg flex flex-col h-full w-full justify-center items-center gap-5"
        >
          <div
            className="bg-greyBg flex flex-col h-full w-full items-center justify-center gap-5"
          >
            <div className="flex flex-col lg:flex-row gap-5 p-5 w-full xl:justify-center justify-between items-center">
              {/* Tarjeta de información */}
              <div
                className="w-full xl:w-1/2 h-full flex flex-col gap-5 bg-greyBlack p-5 rounded-md"
                style={cardStyle}
              >
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-2xl lg:text-3xl text-center pb-5">
                    AUTODIAGNÓSTICO DE FORMACIÓN <br /> EMPRESARIAL
                  </p>
                  <p>
                    De acuerdo con su respuesta, el <b>
                      Modelo Integral de Servicios Empresarial<br />
                      (MISE) es el programa que más se ajusta a sus necesidades.
                    </b>
                  </p>
                </div>
                <p>
                  El MISE es una ruta de acompañamiento integral, gratuita y presencial <br />
                  diseñada a su medida.<br />
                </p>
                <div>
                  Diseñamos su ruta MISE de acuerdo con sus necesidades para que <br />
                  pueda cumplir sus sueños empresariales. La ruta <br />
                  MISE se compone de los ejes:
                </div>
                <ul className="list-disc pl-5">
                  <li>CAPACIDADES GERENCIALES</li>
                  <li>MEJORA DE OPERACIONES APLICANDO <br />BUSINESS INTELLIGENCE</li>
                  <li>GERENCIA DE MARKETING</li>
                  <li>GERENCIA DE VENTAS</li>
                  <li>GERENCIA DE TALENTO HUMANO Y <br /> REGLAMENTACIÓN JURÍDICA EMPRESARIAL</li>
                  <li>FINANZAS GERENCIALES</li>
                </ul>
                <div>
                  <span>Conoce más aquí:&nbsp;</span>
                  <span>
                    <a className="underline" href="https://ccpalmira.org.co/mise/">
                      https://ccpalmira.org.co/mise/
                    </a>
                  </span>
                </div>
              </div>
              {/* Formulario */}
              <div className="w-full xl:w-1/2 h-full justify-center items-center flex">
                <FormAuto />
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default Autoevaluacion;