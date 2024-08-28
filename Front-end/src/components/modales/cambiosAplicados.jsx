import React from 'react'
import VerifyIcon from "../../images/icons/iconsModales/verifyIcon.svg"

export const CambiosAplicados = () => {
  return (
    <div className='bg-white w-[40rem] h-[5rem] justify-between flex rounded-2xl'>
        <div className="bg-grey rounded-l-2xl flex items-center">
            <img src={VerifyIcon.src} className='text-principalGreen' alt="" />
        </div>
        <div className="flex-1">
            <p>¡Aplicado correctamente!</p>
            <p>Se ha creado el usuario.</p>
        </div>
        <div className="flex-auto">
            <div className='bg-principalGreen text-black'>
                <p>x</p>
            </div>
        </div>
    </div>
  )
}
