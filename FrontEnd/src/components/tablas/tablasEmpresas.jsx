import React, { useState, useEffect } from "react";
import { InfoEmpresas } from "./infoEmpresas";
import Buscador from "../../components/inputs/buscador/buscador";

export const TablasEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v2/empresas/");
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error fetching empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  // Filtrar empresas con estado 2
  const empresasConEstado2 = empresas.filter(
    (empresa) => empresa.estado === "2"
  );

  
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
    <>
      <Buscador onSearch={handleSearch} placeholder={"Buscar Empresas..."} filtro={"Nuevas"} />
      <table className="overflow-auto w-full  rounded-xl">
        <thead className="bg-greyBlack border-textBg rounded-xl text-white top-0 z-10">
          <tr>
            <th className="p-5 text-left">NIT</th>
            <th className="p-5 text-left">Nombre</th>
            <th className="p-5 text-left">Sector empresarial</th>
            <th className="p-5 text-center">Información</th>
          </tr>
        </thead>
        <tbody className="overflow-auto divide-y border border-textBg border-t-0 rounded">
          {empresasConEstado2
          .filter(empresasConEstado2 => `${empresasConEstado2.nit} ${empresasConEstado2.nombre_empresa}`.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((empresa) => (
            <InfoEmpresas
              key={empresa.nit}
              nombre={empresa.nombre_empresa}
              sector_empresarial={empresa.sector}
              nit={empresa.nit}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
