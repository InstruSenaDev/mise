// src/AppRoutes.js
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes
import Preloader from './components/preloader/preloader.jsx';

// Componentes de autenticación
const Login = lazy(() => import("./pages/login/login.jsx"));
const Olvidastecontra = lazy(() => import("./pages/olvidasteContraseña/olvidasteContraseña.jsx"));
const Rescribircontrase = lazy(() => import("./pages/olvidasteContraseña/reescribirContraseña.jsx"));

// import Correofallido from "./pages/olvidasteContraseña/correoFallido.jsx";
import Expirado from "./pages/olvidasteContraseña/expiracion.jsx";
import Credencial from "./pages/olvidasteContraseña/credenciales.jsx";

// Componentes de registro
const Registro = lazy(() => import("./pages/registropostu/registro.jsx"));
const RegistroEmpresa = lazy(() => import("./pages/registroEmpresa/registroEmpresa.jsx"));
const NuevoUser = lazy(() => import("./pages/nuevoUser/nuevoUser.jsx"));

// Dashboard y componentes principales
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const DashboardEmp = lazy(() => import("./pages/dashboard/dashboardemp.jsx"));

// Componentes de edición
const EditarPorcentaje = lazy(() => import("./pages/editarPorcentajeDesarr/editarPorcentaje.jsx"));
const EditarUsuario = lazy(() => import("./pages/editarUsuario/editarUsuario.jsx"));

// Componentes de usuarios
const VerUsers = lazy(() => import("./pages/visualizarUsers/visualizarUsers.jsx"));
const EmpresasRegistradas = lazy(() => import("./pages/empresasRegistradas/empresasRegistradas"));
const EmpresasCulminadas = lazy(() => import("./pages/empresasculminadas/empresasCulminadas.jsx"));

// Componentes de módulos
const Modulos = lazy(() => import("./pages/modulos/modulos.jsx"))

// Componentes de sueños
const Sueos = lazy(() => import("./pages/sueños/sueños.jsx"));

// Componentes de preguntas
const Preguntas = lazy(() => import("./pages/preguntas/preguntas.jsx"));

// Componentes de talleres
const Temas = lazy(() => import("./pages/temas/temas.jsx"));

// Otros componentes
const AceptarEmpresas = lazy(() => import("./pages/aceptarEmpresas/aceptarempv.jsx"));
const DetalleEmpresas = lazy(() => import("./pages/aceptarEmpresas/verinfoempresa.jsx"));
const Autoevaluacion = lazy(() => import("./pages/autoevaluacion/autoevaluacion.jsx"));
const VerEmpDiag = lazy(() => import("./pages/diagnostico/verempdiag.jsx"));
const VerEmpDiagF = lazy(() => import("./pages/diagnostico/verempdiagf.jsx"));
const EvaluacionEmpresa = lazy(() => import("./pages/diagnostico/diagnosticoempresa.jsx"));
const EvaluacionEmpresaNuevas = lazy (() => import("./pages/diagnostico/diagnosticoempresas.jsx"))
const EvaluacionEmpresaNuevasf = lazy (() => import("./pages/diagnostico/diagnosticoempresasf.jsx"))
const EvaluacionEmpresaf = lazy(() => import("./pages/diagnostico/diagnosticoempresaf.jsx"));
const DiagnosticoEmpresa = lazy(() => import("./pages/diagnostico/detallediagnostico.jsx"));
const DetalleDiagnosticof = lazy(() => import("./pages/diagnostico/detallediagnosticof.jsx"));

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const role = userData ? userData.id_rol : null;

  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

// Definir las propTypes para ProtectedRoute  
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Router>
        <Routes>
          {/* Rutas sin protección */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/registro-empresa" element={<RegistroEmpresa />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/olvidaste-contraseña" element={<Olvidastecontra />} />
          <Route path="/correo-enviado" element={<Rescribircontrase />} />
          <Route path="/cambiar-contraseña/:uid/:token" element={<Credencial />} />
          <Route path="/expiracion" element={<Expirado />} />


          {/* Rutas protegidas */}
          <Route path="/detalles-empresa/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <DetalleEmpresas />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard-emp/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <DashboardEmp />
            </ProtectedRoute>
          } />
          <Route path="/editar-porcentaje" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EditarPorcentaje />
            </ProtectedRoute>
          } />
          <Route path="/editar-usuario/:id_usuario" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EditarUsuario />
            </ProtectedRoute>
          } />
          <Route path="/visualizar-users" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <VerUsers />
            </ProtectedRoute>
          } />
          <Route path="/empresas-registradas" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EmpresasRegistradas />
            </ProtectedRoute>
          } />
          <Route path="/empresas-culminadas" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EmpresasCulminadas />
            </ProtectedRoute>
          } />
          <Route path="/modulos" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Modulos />
            </ProtectedRoute>
          } />
          <Route path="/sueños" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Sueos />
            </ProtectedRoute>
          } />
          <Route path="/preguntas" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Preguntas />
            </ProtectedRoute>
          } />
          <Route path="/temas" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Temas />
            </ProtectedRoute>
          } />
          <Route path="/aceptar-empresas" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <AceptarEmpresas />
            </ProtectedRoute>
          } />
          <Route path="/autoevaluacion" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <Autoevaluacion />
            </ProtectedRoute>
          } />
          <Route path="/nuevo-user" element={
            <ProtectedRoute allowedRoles={[1]}>
              <NuevoUser />
            </ProtectedRoute>
          } />
          <Route path="/diagnostico" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <VerEmpDiag />
            </ProtectedRoute>
          } />
          <Route path="/evaluacion/empresa/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EvaluacionEmpresa />
            </ProtectedRoute>
          } />

          <Route path="/evaluacionfinal/empresa/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EvaluacionEmpresaf />
            </ProtectedRoute>
          } />
          <Route path="/diagnostico/empresa/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <DiagnosticoEmpresa />
            </ProtectedRoute>
          } />
          <Route path="/diagnostico/empresa-vista/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EvaluacionEmpresaNuevas />
            </ProtectedRoute>
          } />
          <Route path="/diagnostico/empresa-vista-final/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <EvaluacionEmpresaNuevasf />
            </ProtectedRoute>
          } />
           <Route path="/diagnostico-vista-final/:nit" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <VerEmpDiagF />
            </ProtectedRoute>
          } />
          <Route path="/diagnosticofinal/empresa" element={
            <ProtectedRoute allowedRoles={[1, 2, 3]}>
              <DetalleDiagnosticof />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
