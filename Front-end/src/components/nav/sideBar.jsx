import React, { useState } from "react";
import Logo from "../../images/logos/logoPrincipal.svg";
import IconExpand from "../../images/sideBarImg/Expand icon.png";
import ElementSidebar from "./elementSidebar.jsx";
import Logomini from "../../images/sideBarImg/Logomini.png";
import { Elementoscript } from "../../helpers/elements.js";
import { Elementoscriptadmin } from "../../helpers/elementsadmin.js";
import IconLogOut from "../../images/sideBarsvg/log_out.svg";
import IconProfile from "../../images/sideBarImg/avatar@2x.png";
import InfoModal from "../modales/modalinfouser.jsx";

const Sidebar = ({ condicion, nombre }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <>
      {condicion === 1 && (
        <aside
          className={`sidebar hidden sticky sm:flex ${sidebarExpanded ? "w-[18rem]" : "w-[5.5rem]"
            } h-screen bg-greyBlack rounded-br-md transition-all duration-500 ease-in-out`}
          id="sidebar"
        >
          <div className="cajasidebar1 flex flex-col gap-5 w-full" id="cajasidebar1">
            <div className="flex justify-center relative">
              <img
                src={Logo.src}
                className={`w-[10rem] h-[10em] transition-opacity duration-500 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`}
                alt=""
                id="logo"
              />
              <img
                src={Logomini.src}
                className={`w-[2.5rem] h-[3.5rem] pt-5 transition-opacity duration-500 ${sidebarExpanded ? "opacity-0 hidden" : "block"}`}
                id="logo-min"
                alt=""
              />
              <div
                className="w-[24px] h-[24px] rounded-full bg-principalGreen text-sm text-white flex justify-center items-center absolute right-[-10px] top-[20px] cursor-pointer"
                id="toggleBtn"
                onClick={toggleSidebar}
              >
                <i className={`fa-solid fa-angle-${sidebarExpanded ? "left" : "right"}`}></i>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-4">
              {Elementoscript.map((elemento, index) => (
                <ElementSidebar
                  key={index}
                  icon={elemento.icon}
                  texto={elemento.texto}
                  URL={elemento.URL}
                  sidebarExpanded={sidebarExpanded}  // Pasamos el estado de la barra lateral
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 px-4 border-t-2 pt-5 border-white">
              <p className={`text-white text-lg font-semibold pl-2 transition-opacity duration-500 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`} id="admincaja">
                Admin Control
              </p>
              {Elementoscriptadmin.map((elemento, index) => (
                <ElementSidebar
                  key={index}
                  icon={elemento.icon}
                  texto={elemento.texto}
                  URL={elemento.URL}
                  sidebarExpanded={sidebarExpanded}  // Pasamos el estado de la barra lateral
                />
              ))}
            </div>
            <div
              className={`mt-auto usuariofinal w-full bg-darkslategray box-border flex ${sidebarExpanded ? "flex-row gap-[12px]" : "flex-col gap-[20px]"
                } items-center justify-end p-6 leading-[normal] tracking-[normal] text-left text-xs text-darkgray font-base-medium`}
              id="usuariofinal"
            >
              <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-10 w-10 relative rounded-[99px] overflow-hidden shrink-0 object-cover"
                  loading="lazy"
                  onClick={() => setIsModalOpen(true)}
                  alt=""
                  src={IconProfile.src}
                />
                <div className={`flex-1 flex-col items-start justify-start gap-[2px] transition-opacity duration-500 ${sidebarExpanded ? "opacity-100 block" : "opacity-0 hidden"}`} id="profile">
                  <div className="self-stretch relative leading-[20px] font-medium">
                    Bienvenido👋
                  </div>
                  <div className="self-stretch relative text-sm leading-[20px] font-medium text-white">
                    {nombre}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {condicion === 2 && (
        <aside
          className={`sidebar hidden sticky sm:flex ${sidebarExpanded ? "w-[18rem]" : "w-[95px]"
            } h-screen bg-greyBlack rounded-md transition-all duration-500 ease-in-out`}
          id="sidebar"
        >
          <div className="cajasidebar1 flex flex-col gap-5 pt-[6rem] w-full" id="cajasidebar1">
            <div className="flex justify-center relative">
              <img
                src={Logo.src}
                className={`w-[10rem] h-[10em] transition-opacity duration-500 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`}
                alt=""
                id="logo"
              />
              <img
                src={Logomini.src}
                className={`w-[2.5rem] h-[3.5rem] pt-5 transition-opacity duration-500 ${sidebarExpanded ? "opacity-0 hidden" : "block"}`}
                id="logo-min"
                alt=""
              />
              <img
                id="toggleBtn"
                src={IconExpand.src}
                className="cursor-pointer absolute right-[-10px] top-[20px]"
                alt=""
                onClick={toggleSidebar}
              />
            </div>
            <div className="flex flex-col gap-3 px-4">
              {Elementoscript.map((elemento, index) => (
                <ElementSidebar
                  key={index}
                  icon={elemento.icon}
                  texto={elemento.texto}
                  URL={elemento.URL}
                  sidebarExpanded={sidebarExpanded}  // Pasamos el estado de la barra lateral
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 px-4 border-t-2 pt-5 border-white"></div>
            <div
              className={`mt-auto usuariofinal w-full bg-darkslategray box-border flex ${sidebarExpanded ? "flex-row gap-[12px]" : "flex-col gap-[20px]"
                } items-center justify-end p-6 leading-[normal] tracking-[normal] text-left text-xs text-darkgray font-base-medium`}
              id="usuariofinal"
            >
              <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-10 w-10 relative rounded-[99px] overflow-hidden shrink-0 object-cover"
                  loading="lazy"
                  alt=""
                  src={IconProfile.src}
                />
                <div className={`flex-1 flex-col items-start justify-start gap-[2px] transition-opacity duration-500 ${sidebarExpanded ? "opacity-100 block" : "opacity-0 hidden"}`} id="profile">
                  <div className="self-stretch relative leading-[20px] font-medium">
                    Bienvenido👋
                  </div>
                  <div className="self-stretch relative text-sm leading-[20px] font-medium text-white">
                    {nombre}
                  </div>
                </div>
              </div>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 block"
                loading="lazy"
                alt=""
                id="profile-1"
                src={IconLogOut.src}
              />
            </div>
          </div>
        </aside>
      )}
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;