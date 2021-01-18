import React from "react";

const SelectComponent = ({ selectValue, handleChange, columnNames }) => {
  return (
    <>
      <select
        value={selectValue}
        onChange={(event) => {
          handleChange(event);
        }}
      >
        {columnNames.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectComponent;
