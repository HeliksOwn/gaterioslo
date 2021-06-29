import React, {useState, useEffect, useMemo} from 'react';
import { GeoJSON } from 'react-leaflet';
const overpass = require('query-overpass');

const useOverpass = ( gate ) => {
  const [coords, setCoords] = useState([]);
  //const streetname = "Karlstadgata";
  //const streetname = gate;

  // const query = `[out:json];(way[historic=castle](around:10000, 50.0874654,14.4212535);\
  //                             relation[historic=castle](around:10000, 50.0874654,14.4212535););\
  //                             out body;>;out skel qt;`;

  // const query = `[out:json];(node["name"="Tromsøgata"];\
  // way["name"="Tromsøgata"];relation["name"="Tromsøgata"];);\
  // out body;>;out skel qt;`;

  // const query = `[out:json];(node["name"="Amunds vei"];\
  // way["name"="Amunds vei"];relation["name"="Amunds vei"];);\
  // out body;>;out skel qt;`;

  const query = `[out:json];(node["name"="${gate}"];\
  way["name"="${gate}"];relation["name"="${gate}"];);\
  out body;>;out skel qt;`;

  // const query = `[out:json];(node["name"=${streetname}];\
  // way["name"=${streetname}];relation["name"=${streetname}];);\
  // out body;>;out skel qt;`;
  console.log(query);

  const dataHandler = (error, osmData) => {
    if (!error && osmData.features !== undefined) {
      //this.setState({ geojson: osmData });
      console.log(osmData.features[0].properties.tags.name);
      console.log(osmData.features[0].geometry.coordinates);
      setCoords(osmData.features[0].geometry.coordinates);
    }
  };
  
  useEffect(() => {
    const options = {
      overpassUrl: 'https://overpass-api.de/api/interpreter'
    };
    
    overpass(query, dataHandler, options);
  }, [query]);
  console.log("COORDS:");
  console.log(coords);
  return coords;
};

export default useOverpass;