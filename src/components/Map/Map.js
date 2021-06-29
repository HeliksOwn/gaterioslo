import { MapContainer, TileLayer, Marker, Tooltip, Polyline, Popup, CircleMarker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.css';

const Map = ({places, center, tile, hot, streets}) => {

  //console.log(streets.data.rows[0]);
  
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

  const redOptions = { color: '#CD5C5C', fillColor: '#DC143C', fillOpacity: '1', opacity: '1', weight: '2' };
    
  const showStreet = (place) => {
    // show place's description
    place.showstreet = !place.showstreet;
  }

  const homeAddress = [59.92451,10.7639];

  return (
    <>
      <MapContainer
        center={center}
        zoom={14}
      >

        {/* {hot.map( (h,index) =>  (
           <CircleMarker
            center={[h.lat, h.lon]}
            radius={5}
            pathOptions={yellowMarker} >
              <Tooltip>{index}</Tooltip> 
            </CircleMarker>
        ))} */}

        <CircleMarker
            center={homeAddress}
            radius={12}
            pathOptions={yellowMarker} >
              <Tooltip>Karlstadgata 14</Tooltip> 
            </CircleMarker>

        {places.map( place => (
          <>
            <CircleMarker
              key={place.id}
              center={place.position}
              radius={8}
              pathOptions={markerColor}
              eventHandlers={{ click: () => showStreet(place) }}
            >
              <Tooltip>{place.title}</Tooltip> 
            </CircleMarker>
            {/* {place.showstreet ? 
              <Polyline zIndex={10} positions={place.polyline} pathOptions={redOptions} /> : null } */}
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