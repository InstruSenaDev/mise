import React from 'react';
import './input3.css'; // Asegúrate de incluir el archivo CSS

const InputComponent = ({
  inputType,
  inputPlaceholder,
  DataType,
  width,
  widthInput,
  height,
  additionalClass,
  value,
  onChange,
  name
}) => {
  return (
    <div className={`text-textBg items-center text-start content-center flex flex-row ${additionalClass}`}>
      <div className={width}>
        <p className="font-semibold">{DataType}</p>
      </div>
      <div>
        <input
          className={`inputext border ${widthInput} ${height} rounded-md text-white peer border-solid border-white bg-transparent placeholder:text-start pl-2 text:break-normal overflow-y-auto custom-scrollbar`}
          placeholder={inputPlaceholder}
          type={inputType}
          value={value}
          name={name}
          onChange={onChange}
          autoComplete='off'
          onFocus={(e) => e.target.removeAttribute('readonly')} // Evitar autocompletado usando readonly
          readOnly // Hacer que sea de solo lectura hasta que se seleccione
        />
      </div>
    </div>
  );
};

export default InputComponent;
