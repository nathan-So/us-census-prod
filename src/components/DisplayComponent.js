import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DisplayComponent = () => {
  const table = () => {
    if (citizens.length <= 100) {
      citizens.map((citizen, index) => {
        const { avg_age, count } = citizen;
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{citizen[selectValue]}</td>
            <td>{avg_age.toFixed(1)}</td>
            <td>{count}</td>
          </tr>
        );
      });
    }
  };

  // ColumnName.js file
  const columnNames = [
    "class of worker",
    "industry code",
    "occupation code",
    "education",
    "wage per hour",
    "last education",
    "marital status",
    "major industry code",
    "major occupation code",
    "mace",
    "hispanice",
    "sex",
    "member of labor",
    "reason for unemployment",
    "fulltime",
    "capital gain",
    "capital loss",
    "dividends",
    "income tax liability",
    "previous residence region",
    "previous residence state",
    "household-with-family",
    "household-simple",
    "weight",
    "msa-change",
    "reg-change",
    "within-reg-change",
    "lived-here",
    "migration prev res in sunbelt",
    "num persons worked for employer",
    "family members under 118",
    "father birth country",
    "mother birth country",
    "birth country",
    "citizenship",
    "own business or self employed",
    "fill questionnaire for veteran's admin",
    "veterans benefits",
    "weeks worked in year",
    "year",
    "salary range",
  ];

  //* C'est ici que je stock le résultat du fetch
  const [citizens, setCitizens] = useState([]);

  const [selectValue, setSelectValue] = useState("class of worker");

  useEffect(() => {
    dynamicFetchCitizens(selectValue);
  }, [selectValue]);

  // requete service file.js
  const dynamicFetchCitizens = async (column) => {
    axios
      // .get("http://localhost:4001/table/all/", { column: column })
      .get("http://localhost:4001/table/all/", { params: { column: column } })

      .then((response) => {
        setCitizens(response.data);
      })
      .catch((error) =>
        console.error(`There waw an error retrieving citizen list : ${error}`)
      );
    console.log(column);
  };

  console.log(citizens);

  const handleChange = (event) => {
    // dynamicFetchCitizens(event.target.value);
    setSelectValue(event.target.value);
  };

  return (
    <div>
      {/* header component */}
      <h1>US census (prod)!</h1>
      <h3>Click the paramater you want to display citizens from !</h3>

      {/* select component */}
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

      {citizens.length <= 100 && (
        <>
          <table className="content-table">
            <thead>
              <tr>
                <th colSpan="1">Line</th>
                <th colSpan="1">{selectValue}</th>
                <th colSpan="1">Age average</th>
                <th colSpan="1">Count</th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((citizen, index) => {
                const { avg_age, count } = citizen;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{citizen[selectValue]}</td>
                    <td>{avg_age.toFixed(1)}</td>
                    <td>{count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {citizens.length > 100 && (
        <>
          <table className="content-table">
            <thead>
              <tr>
                <th colSpan="1">Line</th>
                <th colSpan="1">{selectValue}</th>
                <th colSpan="1">Age average</th>
                <th colSpan="1">Count</th>
              </tr>
            </thead>
            <tbody>
              {citizens.slice(0, 100).map((citizen, index) => {
                const { avg_age, count } = citizen;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{citizen[selectValue]}</td>
                    <td>{avg_age.toFixed(1)}</td>
                    <td>{count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>There are {citizens.length - 100} lines not shown here !</p>
        </>
      )}
    </div>
  );
};

export default DisplayComponent;
