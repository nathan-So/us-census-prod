import React from "react";

const TableComponent = ({ citizens, selectValue }) => {

  return (
    <>

      {(citizens.length <= 100) && (
        <>
          <p>There are {citizens.length} lines here.</p>
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
          <p>Beware there are only 100 lines shown here, {citizens.length - 100} remains unshown !</p>

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
        </>
      )}
      {/* {citizens.length === 0 && (
        <p>There must be something wrong fetching the data ...</p>
      )} */}
    </>
  );
};

export default TableComponent;
