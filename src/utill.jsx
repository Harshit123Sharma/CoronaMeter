import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    multiplier: 800,
    option: { color: "#FF5349", fillColor: "#FF5349" },
  },
  recovered: {
    multiplier: 1200,
    option: { color: "#adff2f", fillColor: "#adff2f" },
  },
  deaths: {
    multiplier: 2000,
    option: { color: "#505050", fillColor: "#505050" },
  },
};

export const sortData = (data) => {
    let sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map with intercative tooltip.
export const drawCircles = (data, casesType = "cases") => {
    data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={casesTypeColors[casesType].option}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="container">
            <div
              className="flag"
              styl={{ backgroundImages: `url(${country.countryInfo.flag})` }}
            />
            <div className="name"> {country.country} </div>
            <div className="confirmed">
              {" "}
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="recovered">
              {" "}
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="deaths">
              {" "}
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
};