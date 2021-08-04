import React, { useState, useMemo, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, Popup, CircleMarker } from 'react-leaflet';
//import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import styles from './Map.css';
// import { Button } from 'semantic-ui-react';

const Map = ({places, tile, todostreets, toggletodo}) => {
  
  //console.log(toggletodo);

  let tiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
  let attribution;
  let defaultAttribution = '&copy; 2021 &middot; <a href="https://maps.omniscale.com/">Omniscale</a> ' +
  '&middot; Map data: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  let mapboxAttribution = '<a href="http://www.kartverket.no/">Kartverket</a>';
  let grayTiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
  let regularTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  let mapboxUrl = 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}';
  let topographicURL = 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}';
  let terrainURL = 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=terreng_norgeskart&zoom={z}&x={x}&y={y}';
  let simpleURL = 'https://tiles.wmflabs.org/bw-mapnik/${z}/${x}/${y}.png';

  switch (tile) {
    case 1:
      tiles = grayTiles;
      attribution = defaultAttribution;
      break;
    case 2:
      tiles = regularTiles;
      attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
      break;
    case 3:
      tiles = mapboxUrl;
      attribution = mapboxAttribution;
      break;
    case 4:
      tiles = topographicURL;
      attribution = mapboxAttribution;
      break;
    case 5:
      tiles = terrainURL;
      attribution = mapboxAttribution;
      break;
    case 6:
      tiles = simpleURL;
      attribution = mapboxAttribution;
      break;
    default:
      tiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
      attribution = defaultAttribution;
  }
  
  const markerColor = {
    fillColor: "#00B2FF",
    color: "white",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };

  const yellowMarker = {
    fillColor: "yellow",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };

  const greenMarker = {
    fillColor: "#50C878",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  const blueMarker = {
    fillColor: "#6495ED",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  const orangeMarker = {
    fillColor: "#FFBF00",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  const whiteMarker = {
    fillColor: "#FFFFFF",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  const blackMarker = {
    fillColor: "#000000",
    color: "yellow",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };

  class MarkerOptions {
    constructor(color = "#FFFFFF", fill = "#000000", weight = 1, opacity = 1, fillOpacity = 1) {
      this.color = color;
      this.fill = fill;
      this.weight = weight;
      this.opacity = opacity;
      this.fillOpacity = fillOpacity;
    }
  }

  const redMarker = { color: '#fff', fillColor: '#DC143C', fillOpacity: '1', opacity: '1', weight: '1' };
  let colorScheme = {'2019': greenMarker, '2020': orangeMarker, '2021': blueMarker, '2022': yellowMarker, '2023': redMarker };
      
  const homeAddress = [59.92451,10.7639];

  // potensiell feil, filtrerer vekk de uten koordinater, men vi vil vite hvorfor
  let visited =  places.filter(function(x) {                                
    return x?.coordinates?.length > 0;
  }).map(function (x) {
    return x;
  });

  // let corrected = visited.map((element) => { 
  //   if (element?.coordinates[0] && element.coordinates[0].length === 2) {
  //     return element
  //   } else {
  //     return {...element, coordinates: element.coordinates[0]}
  //   }
  // });


  let corrected = visited.map((element, index) => { 
    if (element?.coordinates && element?.coordinates[0] && element.coordinates[0].length === 2) {
      return {...element, valid: true }
    } else if (element?.coordinates && element?.coordinates[0] && element.coordinates[0].length > 2) {
      return {...element, coordinates: element.coordinates[0], valid: true }
    } else {
      console.log(index);
      return {...element, valid: false }
    }
  });

  let correctedtodostreets = todostreets.map((element, index) => { 
    if (element?.coordinates && element?.coordinates[0] && element.coordinates[0].length === 2) {
      return {...element, valid: true }
    } else if (element?.coordinates && element?.coordinates[0] && element.coordinates[0].length > 2) {
      return {...element, coordinates: element.coordinates[0], valid: true }
    } else {
      console.log(index);
      return {...element, valid: false }
    }
  });

  console.log(correctedtodostreets);

  function ActiveMarker(street, color="red", fill="pink") {
    
    const [showPath, setShowPath] = useState(false);
    const [radius, setRadius] = useState(6);
    const [segment] = useState(street.params.coordinates);
    const options = new MarkerOptions(color="black", fill="yellow");
    
    const eventHandlers = useMemo(
      () => ({
        click() {
          setShowPath(currentState => !currentState);
        },
      }),
      [],
    )

    useEffect(() => {
      showPath ? setRadius(12) : setRadius(6);
    }, [radius, showPath]);

    return (
      <>
      { street.params.valid ? 
        <>
        <CircleMarker
            center={[street.params.coordinates[0][1],street.params.coordinates[0][0]]}
            radius={radius}
            eventHandlers={eventHandlers}
            pathOptions={colorScheme[street.params.år]} >
            <Tooltip>{street.params.adresse} </Tooltip> 
        </CircleMarker>
        {showPath ? 
          <>
          {segment.map( node => 
            (
              <CircleMarker
                center={[node[1],node[0]]}
                radius={3}
                pathOptions={options} >
                <Tooltip>{street.adresse}</Tooltip> 
              </CircleMarker>
            ))}
          </>
          : null
        } </>
        : null 
      }
      </>
    )
  }

  return (
    <>
      
      <MapContainer
        center={homeAddress}
        zoom={14}
      >
        {toggletodo ? 
        <>
        {correctedtodostreets.map( (nodes) => 
          (
            <>
              <ActiveMarker params={nodes} />
            </>
        ))} 
        </>
        : null }
        <CircleMarker
            center={homeAddress}
            radius={7}
            pathOptions={yellowMarker} 
            >
              <Tooltip>Karlstadgata 14</Tooltip> 
        </CircleMarker> 

        {corrected.map( (street, index) => 
          (
            <>
              <ActiveMarker key={index} params={street} />
            </>
        ))} 
        <TileLayer 
            attribution={attribution}
            url={tiles}>
        </TileLayer>
      </MapContainer>
    </>
  );
};

export default Map;