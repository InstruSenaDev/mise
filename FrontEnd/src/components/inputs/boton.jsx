import React from 'react';

const Boton = ({ onClick, text }) => {
  return (
    <div
      className="bg-principalGreen rounded-md text-white text-center font-semibold cursor-pointer w-[6rem] h-10 p-2"
      type="submit"
      onClick={onClick}
    >
      <p>{text}</p>
    </div>
  );
};

export default Boton;



