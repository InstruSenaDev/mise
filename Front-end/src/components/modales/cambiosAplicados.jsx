import React from 'react'

export const CambiosAplicados = () => {
  return (
    <div className='bg-white w-[40rem] justify-between flex '>
        <div className="bg-grey flex-1">
            <div></div>
        </div>
        <div className="flex-">
            <p>¡Aplicado correctamente!</p>
            <p>Se ha aplicado correctamente los cambios.</p>
        </div>
        <div className="flex-1">
            <div className='bg-principalGreen text-black'>
                <p>x</p>
            </div>
        </div>
    </div>
  )
}
