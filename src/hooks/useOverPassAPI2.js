import React from 'react';
const { useState, useEffect } = React;
const OverpassFrontend = require('overpass-frontend');

const useOverPassAPI2 = (streetname = '') => {

  const [streetCoords, setStreetCoords] = useState([]);
  //const [rest, setRest] = useState([]);
  const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter');

  useEffect(() => {
    console.log('Make api query');

    overpassFrontend.BBoxQuery(
      'node["name"="Tromsøgata"]',
      'way["name"="Tromsøgata"]',
      'relation["name"="Tromsøgata"]',
      {
        properties: OverpassFrontend.ALL
      },
      function (err, result) {
        console.log(JSON.stringify(result, null, 4));
      },
      function (err) {
        if (err) { console.log(err) }
      }
    )
  }, []);

  // useEffect(() => {
  //   console.log("call API once");
  //   console.log("Now what...");
  //   // request restaurants in the specified bounding box
  //   overpassFrontend.BBoxQuery(
  //     'nwr[amenity=restaurant]',
  //     { minlat: 48.19, maxlat: 48.20, minlon: 16.33, maxlon: 16.34 },
  //     {
  //       properties: OverpassFrontend.ALL
  //     },
  //     function (err, result) {
  //       console.log('* ' + result.tags.name + ' (' + result.id + ')')
  //     },
  //     function (err) {
  //       if (err) { console.log(err) }
  //     }
  //   )
  // }, []);
  return streetCoords;

}

export default useOverPassAPI2;

