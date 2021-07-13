import React from "react";
import { useEffect, useState } from "react";
import { 
  FormControl,
   Select, 
   Card,
   CardContent,
   } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Plot from "./Plot";
import Tables from "./Tables";
import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat } from "./utill";
import "../styles/App.css";
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 35.6, lng: 97.25});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data=> {
      setCountryInfo(data);
    });
    }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setTableData(sortedData); //India, France, etc...
          setMapCountries(data);
          setCountries(countries); //UK, USA, etc...
        });
    };

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "WorldWide" 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);      
      setCountryInfo(data);
      countryCode === "worldwide"
        ? setMapCenter([34.80746, -40.4796])
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);
    });
  };

  return (
    <div className="app">
      <div className="left">
        <div className="header">
          <h1>CORONA TRACKER</h1>
          <FormControl variant="outlined" className="dropdown">
            <Select
              native
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <option className="options" value="worldwide">Select Country</option>
              {countries.map((country) => (
                <option className="options" value={country.value}>{country.name}</option>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="stats">
          <InfoBox
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            subject="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            numbers={prettyPrintStat(countryInfo.cases)}
          ></InfoBox>
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            subject="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            numbers={prettyPrintStat(countryInfo.recovered)}
          ></InfoBox>
          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            subject="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            numbers={prettyPrintStat(countryInfo.deaths)}
          ></InfoBox>
        </div>
        <Plot
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="right">
        <CardContent>
          <div className="right_side">
            <h3><b> Live Cases by Country </b></h3>
            <Tables countries={tableData} />
            <h3><b> WorldWide new {casesType} </b></h3>
            <LineGraph className="graph" casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
