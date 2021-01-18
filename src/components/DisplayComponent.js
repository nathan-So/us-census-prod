import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectComponent from "./SelectComponent";
import TableComponent from "./TableComponent";
import HeaderComponent from "./HeaderComponent"

import { columnNames } from ".././Data/columnNames";

const DisplayComponent = () => {
  //Result of  fetching
  const [citizens, setCitizens] = useState([]);
  //Current value of the select (provoking the fetching )
  const [selectValue, setSelectValue] = useState("class of worker");

  //Everytime selectValue changes on DOM, new fetching is done
  useEffect(() => {
    dynamicFetchCitizens(selectValue);
  }, [selectValue]);


  //Fetching server (Get request)
  const dynamicFetchCitizens = async (column) => {
    axios
      .get("http://localhost:4001/table/all/", { params: { column: column } })
      .then((response) => {
        setCitizens(response.data);
      })
      .catch((error) =>
        console.error(`There waw an error retrieving citizen list : ${error}`)
      );
    // console.log(column);
  };

  //handleChange of select value on DOM
  const handleChange = (event) => {
    //If fetching is called here then we can get rid of useEffect
    //dynamicFetchCitizens(event.target.value);
    setSelectValue(event.target.value);
  };

  return (
    <>
      <HeaderComponent />

      <SelectComponent
        selectValue={selectValue}
        handleChange={handleChange}
        columnNames={columnNames}
      />

      <TableComponent selectValue={selectValue} citizens={citizens} />
    </>
  );
};

export default DisplayComponent;
