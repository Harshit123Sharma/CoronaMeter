import React from "react";
import numeral from "numeral";
import "../styles/Tables.css";

function Tables({ countries }) {
    return (
      <table className="table">
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default Tables;
