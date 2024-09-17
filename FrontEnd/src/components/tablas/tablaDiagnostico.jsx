import { useState, useEffect } from 'react';
import InfoDiag from './infoDiagnostico';
import Buscador from '../inputs/buscador/buscador';

const TablaDiagnostico = () => {
    const [empresas, setEmpresas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Petición para obtener las empresas
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v2/empresas/');
                const data = await response.json();
                
                // Filtramos las empresas que tienen diagnostico en 0 y estado en 2
                const empresasFiltradas = data.filter(empresa => empresa.diagnostico_value === 0 && empresa.estado === 2);
                setEmpresas(empresasFiltradas);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        

        fetchEmpresas();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            <div className='flex flex-row w-full'>
                <Buscador onSearch={handleSearch} placeholder={"Buscar Empresa..."} filtro={"Pene"} />
            </div>
            <div className="overflow-y-auto max-h-[40rem] custom-scrollbar w-full justify-center rounded-b-xl">
                <div className="bg-greyBlack border-textBg rounded-t-xl text-white flex">
                    <div className="flex-1 p-5 text-left">NIT</div>
                    <div className="flex-1 p-5 text-center">Nombre</div>
                    <div className="flex-1 p-5 text-center">Actividad Economica</div>
                    <div className="flex-1 p-5 text-center"></div> {/* Nueva columna para el botón */} 
                </div>
                <div className="overflow-auto divide-y border border-textBg border-t-0 rounded">
                    {empresas
                        .filter(empresa => 
                            `${empresa.nit} ${empresa.nombre_empresa}`.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(empresa => (
                            <InfoDiag
                                key={empresa.nit}
                                nit={empresa.nit}
                                nombre_empresa={empresa.nombre_empresa}
                                act_economica={empresa.act_economica}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default TablaDiagnostico;
