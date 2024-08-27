import React, { useState, useEffect } from 'react';
import Logo from '../../images/logos/logoPrincipal.svg';
import IconExpand from '../../images/sideBarImg/Expand icon.png';
import Elemento from './elementsidebar'; // Importa tu componente de ElementSidebar
import Logomini from '../../images/sideBarImg/Logomini.png';
import IconLogOut from '../../images/sideBarsvg/log_out.svg';
import { Elementoscript } from '../../helpers/elements';
import { Elementoscriptadmin } from '../../helpers/elementsadmin';

const Sidebar1 = () => {
  const [isExpanded, setIsExpanded] = useState(true
    
  );

  useEffect(() => {
    const toggleButton = document.getElementById('toggleBtn');
    const elements = document.querySelectorAll('.sidebar-element');
    const profilesideBar = document.getElementById('profile');
    const profilesideBar1 = document.getElementById('profile-1');
    const cajaadmin = document.getElementById('admincaja');
    const sidebarLogomini = document.getElementById('logo-min');
    const sidebarLogo = document.getElementById('logo');
    const cajaicon = document.querySelectorAll('.cajaelemento');
    const cadasidebar = document.getElementById('cajasidebar1');

    toggleButton.addEventListener('click', () => {
      setIsExpanded(!isExpanded);
    });

    if (isExpanded) {
      elements.forEach((element) => element.classList.remove('hidden'));
      profilesideBar.classList.remove('hidden');
      profilesideBar1.classList.remove('hidden');
      cajaadmin.classList.remove('hidden');
      sidebarLogomini.classList.add('hidden');
      sidebarLogo.classList.remove('hidden');
      cajaicon.forEach((element) => element.classList.add('flex'));
    } else {
      elements.forEach((element) => element.classList.add('hidden'));
      profilesideBar.classList.add('hidden');
      profilesideBar1.classList.add('hidden');
      cajaadmin.classList.add('hidden');
      sidebarLogomini.classList.remove('hidden');
      sidebarLogo.classList.add('hidden');
      cajaicon.forEach((element) => element.classList.remove('flex'));
      cadasidebar.classList.add('pt-[6rem]');
    }
  }, [isExpanded]);

  return (
    <aside
      className={`sidebar hidden sm:flex ${
        isExpanded ? 'w-[23rem]' : 'w-[5.5rem]'
      } h-screen bg-greyBlack rounded-md transition-all duration-500 ease-in-out`}
      id="sidebar"
    >
      <div className="cajasidebar1 flex flex-col gap-5 w-full" id="cajasidebar1">
        <div className="absolute w-15 h-15 justify-end">
          <img
            id="toggleBtn"
            src={IconExpand.src}
            className="cursor-pointer"
            alt=""
          />
        </div>

        <div className="flex justify-center">
          <img
            src={Logo.src}
            className="w-[10rem] h-[10em] block"
            alt=""
            id="logo"
          />
          <img
            src={Logomini.src}
            className="w-[2.5rem] h-[3.5rem] pt-5 hidden"
            id="logo-min"
            alt=""
          />
        </div>

        <div className="flex flex-col gap-3 px-4">
          {Elementoscript.map((elemento, index) => (
            <elementSidebar
              key={index}
              icon={elemento.icon}
              texto={elemento.texto}
              URL={elemento.URL}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 px-4 border-t-2 pt-5 border-white">
          <p className="text-white text-lg font-semibold pl-2" id="admincaja">
            Admin Control
          </p>
          {Elementoscriptadmin.map((elemento, index) => (
            <elementSidebar
              key={index}
              icon={elemento.icon}
              texto={elemento.texto}
              URL={elemento.URL}
            />
          ))}
        </div>

        <div className="mt-auto usuariofinal w-full bg-darkslategray box-border flex flex-row items-center justify-end p-6 gap-[12px] leading-[normal] tracking-[normal] text-left text-xs text-darkgray font-base-medium">
          <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-10 w-10 relative rounded-[99px] overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/public/avatar@2x.png"
            />

            <div
              className="flex-1 flex flex-col items-start justify-start gap-[2px]"
              id="profile"
            >
              <div className="self-stretch relative leading-[20px] font-medium">
                Welcome back 👋
              </div>
              <div className="self-stretch relative text-sm leading-[20px] font-medium text-white">
                Johnathan
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
  );
};

export default Sidebar1;
