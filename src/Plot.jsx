import React from "react";
import "./Plot.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { drawCircles } from "./utill";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Plot({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      <MapContainer>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {drawCircles(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Plot;