import React from "react";
import "./Plot.css";
import { MapContainer, TileLayer, useMap, Circle, Popup } from "react-leaflet";
import numeral from "numeral";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

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
    option: { color: "#6b6b6b", fillColor: "#6b6b6b" },
  },
};


function Plot({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      <MapContainer>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/*Draw circles on the map with intercative tooltip.  */}
        {countries.map((country) => (
          <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={casesTypeColors[casesType].option}
            fillOpacity={0.4}
            radius={
              Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
          >
            <Popup>
              <div className="container">
                <div
                  className="flag"
                  style={{
                    backgroundImages: `url(${country.countryInfo.flag})`,
                  }}
                />
                <div className="name"> {country.country} </div>
                <div className="confirmed">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

export default Plot;