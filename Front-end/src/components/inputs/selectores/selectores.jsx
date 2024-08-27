import React from 'react';

const SelectComponent = ({ id, options, value, onChange, type, name }) => {
  return (
    <select
      id={id}
      className="bg-transparent px-2 py-2.5 h-full w-full rounded-lg border font-sans text-lg font-normal focus:bg-transparent pr-8 appearance-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}  // Pasa el nombre del campo junto con el valor
    >
      <option value="" disabled>{type}</option>
      {options.map((option) => (
        <option key={option.value} className="text-black" value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;

