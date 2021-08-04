import React, {useState, useEffect, useCallback} from 'react';
import Map from './Map/Map';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
//import { GeoJSON } from 'react-leaflet';
import { Dimmer, Loader, Button} from 'semantic-ui-react'
import gatedata from '../files/oslogater-coords.json';
import styles from './OsloKart.css';

/**
 * 
 * overpass turbo code:
 * 
 * 
 */

// [out:json][timeout:25];
// (
// 	area[name="Oslo"];
// 	way(area)[highway][name];
// );

// out body;
// >;
// out skel qt;

const OsloKart = () => {

    const defaultPosition = [59.92045, 10.7280];
    const visitedStreetsURL = 'http://gsx2json.com/api?id=17RCE9ZwQsC8kV6wnRdYAizcxZgbeHKY8WmL7wt_v8aE&sheet=1&columns=false';
    const [allStreets, setAllStreets] = useState(null);
    const [visitedStreets, setVisitedStreets] = useState(null);
    const [notVisitedStreets, setNotVisitedStreets] = useState([]);
    const [visitedCoords, setVisitedCoords] = useState(null);
    const [notVisitedCoords, setNotVisitedCoords] = useState(null);
    const [showStreets, setShowStreets] = useState(false);
    const [todoStreets, setTodoStreets] = useState(false);
    const [showTodoStreets, setShowTodoStreets] = useState(false);
    const [mapReady, setMapReady] = useState(false);

    // const wslookup = 'https://ws.geonorge.no/adresser/v1/sok?adressenavn=';
    // const commune =  '&kommunenummer=0301';
    // const filtrer = '&filtrer=adresser.representasjonspunkt.lat,adresser.representasjonspunkt.lon,adresser.postnummer,adresser.adressenavn';

    const colorMap = {'01': '#FDAC53', '02': '#9BB7D4', '03': '#B55A30', '04': '#F5DF4D', '05': '#0072B5', '06': '#A0DAA9', '07':'#E9897E', '08': '#00A170', '09': '#926AA6', '10': '#D2386C', '11':'#FFA500', '12': '#798EA4', '13': '#00758F', '14': '#FA7A35', '15': '6B5876'};

    useEffect(() => {
      (async () => {
        setAllStreets(await axios.get(visitedStreetsURL)
          .then( response => {
              const datarows = response.data.rows;
              const visited = datarows.filter(street => street.datobesøkt !== 0);
              setVisitedStreets(visited);
              const notvisited = datarows.filter(street => street.datobesøkt === 0);
              setNotVisitedStreets(notvisited);
          }));
      })();
    }, []);

    useEffect(() => {
      visitedStreets?.length > 0 ? setShowStreets(true) : setShowStreets(false);
      
      if(visitedStreets?.length > 0) {
        (async () => {
          const newArr = visitedStreets.map((v) => {
            let current = v.adresse.toLowerCase();
            return {...v, coordinates: gatedata[current]}
          });
          setVisitedCoords(newArr);
        })();
      }
    }, [visitedStreets]);

    useEffect(() => {
      notVisitedStreets?.length > 0 ? setTodoStreets(true) : setTodoStreets(false);

      if(notVisitedStreets?.length > 0) {
        (async () => {
          const newArr = notVisitedStreets.map((v) => {
            let current = v.adresse.toLowerCase();
            return {...v, coordinates: gatedata[current]}
          });
          setNotVisitedCoords(newArr);
        })();
      }
    }, [notVisitedStreets]);

    useEffect(() => {
      if(visitedCoords?.length > 0 && notVisitedCoords?.length > 0) {
        setMapReady(true);
      }
    }, [visitedCoords, notVisitedCoords]);

    const showTodoNodes = (e) => { 
      setShowTodoStreets(currentState => !currentState);
    }

    return (
      <>
        <div className="ui grid">
          <div className="twelve wide computer twelve wide tablet sixteen wide mobile column">
            <div className="ui segment">
            { mapReady ? 
              <>

              <Button primary onClick={showTodoNodes} className={styles.todoBtn}> Vis TODO-gater</Button>
              
              <Map center={defaultPosition} tile={3} places={visitedCoords} todostreets={notVisitedCoords} toggletodo={showTodoStreets} />
              </>
              : null}
            </div>
          </div>

          <div className="four wide computer our wide tablet sixteen wide mobile column">
            <div className="ui segment" style={{ height: '80vh', backgroundColor: '#FFFFE0', overflowY: 'scroll', marginRight: '10px' }}>
              <div className="ui bulleted list">
                  { showStreets ? 
                    <>
                      <h2>BESØKTE GATER <br /> ( {  visitedStreets.length } )</h2>
                      <b>
                        <div>2019: grønn</div>
                        <div>2020: oransje</div>
                        <div>2021: blå</div>
                      </b>
                      <br />
                      <div>
                        {visitedStreets.map( filteredStreet => (
                            <div className="item"> {filteredStreet.adresse} </div>
                        ))} 
                      </div>
                    </> : 
                      <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                      </Dimmer>
                  }
              </div>
            </div>
            { todoStreets ? 
              <>
                <h3>Gjenstående:  ( {  notVisitedStreets.length } )</h3>
              </> : null
            }
          </div>
        </div>
      </>
    ) 
}

export default OsloKart;