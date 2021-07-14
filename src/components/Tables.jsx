import React from "react";
import numeral from "numeral";
import "../styles/Tables.css";
//^2.9.4"

function Tables({ countries }) {
    return (
      <div className="table">
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
      </div>
    );
}

export default Tables;
