import React, { useEffect, useState } from 'react';
import InfoAE from './infoAE';

const TableComponent = () => {
  const [empresas, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/v2/empresas/')
      .then((response) => response.json())
      .then((data) => {
        const empresasFiltradas = data.filter(empresa => empresa.estado === '1');
        setEmpresas(empresasFiltradas);
        setShowFilters(empresasFiltradas.length > 0);
      })
      .catch((error) => console.error('Error fetching empresas:', error));
  }, []);

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.gerente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.razon_social.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showFilters && (
        <div className="flex items-center py-3 gap-4 justify-end text-sm">
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-white rounded-lg bg-transparent p-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass text-white"></i>
          <div className="flex items-center">
            <div className="flex items-center gap-2 border-2 rounded-lg border-white bg-transparent text-white p-2">
              <p>Más nuevas</p>
              <i className="fa-solid fa-filter"></i>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full rounded-xl overflow-auto">
        <div className="flex  justify-between items-center bg-greyBlack text-white rounded-xl">
          {filteredEmpresas.length > 0 ? (
            <>
              <div className="p-5 flex-1">Empresa</div>
              <div className="p-5 flex-1">Representante</div>
              <div className="p-5 flex-1">Razón Social</div>
              <div className="p-5 flex-1">Información</div>
              <div className="p-5 flex-1"></div>
            </>
          ) : (
            <div className="p-5 text-left flex-1">
              Actualmente no se encuentran empresas disponibles para aceptar
            </div>
          )}
        </div>
        <div className="divide-y border border-textBg border-t-0 rounded">
          {filteredEmpresas.map((empresa) => (
            <InfoAE
              nit={empresa.nit}
              key={empresa.nit}
              nombre_empresa={empresa.nombre_empresa}
              representante={empresa.gerente}
              razon_social={empresa.razon_social}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TableComponent;
