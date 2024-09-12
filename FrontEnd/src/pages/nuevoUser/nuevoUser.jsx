import React from 'react';
import FormsNuevouser from "../../components/forms/formsNuevouser/formsNuevouser.jsx";
import LayoutDashboard from "../../layouts/LayoutDashboard";
import GoBack from '../../components/inputs/goback/GoBack.jsx';


const NuevoUser = () => {
  return (
    <LayoutDashboard>
      <main className="bg-greyBg w-full h-screen overflow-x-hidden">
        <div className="flex flex-col w-full h-full">
          <div className="bg-greyBlack h-20 w-full" />
          <div className="bg-greyBg flex flex-col px-4 gap-2 py-2 sm:px-8 h-full w-full">
            <GoBack text={"Nuevo Usuario"} />
            <div className="bg-greyBlack flex flex-col gap-2 lg:gap-8 p-4 lg:p-5 w-full rounded-md">
              <div className="flex flex-col w-full px-6 py-2">
                <p className="text-white text-3xl">
                  Información para Creación de Usuario
                </p>
                <FormsNuevouser />  
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutDashboard>
  );
};

export default NuevoUser;
