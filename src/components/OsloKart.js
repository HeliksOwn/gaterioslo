import React, {useState, useEffect, useCallback} from 'react';
//import { Container } from 'semantic-ui-react';
import Map from './Map/Map';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import useOverpass from '../hooks/useOverpass';

const OsloKart = () => {

    const defaultPosition = [59.92045, 10.7280];
    const visitedStreetsURL = 'http://gsx2json.com/api?id=17RCE9ZwQsC8kV6wnRdYAizcxZgbeHKY8WmL7wt_v8aE&sheet=1&columns=false';
    
    const [allStreets, setAllStreets] = useState(null);
    //const [currentStreet, setCurrentStreet] = useState(null);
    const [visitedStreets, setVisitedStreets] = useState(null);
    const [notVisitedStreets, setNotVisitedStreets] = useState([]);
    const [visitedCoords, setVisitedCoords] = useState(null);
    const [showStreets, setShowStreets] = useState(false);
    //const [showStreets, setShowStreets] = useState(false);
    const [todoStreets, setTodoStreets] = useState(false);
    const lookupStreetCoords = 'https://ws.geonorge.no/adresser/v1/sok?adressenavn=';
    const commune =  '&kommunenummer=0301';


    const useStreetHook = (gatenavn) => {
      return useOverpass(gatenavn);
    }
    // const baba = useStreetHook("Amaldus Nielsens plass");
    
    useEffect(() => {
      (async () => {
        setAllStreets(await axios.get(visitedStreetsURL)
          .then( response => {
              const streets = response.data.rows;
              const visited = streets.filter(street => street.datobesøkt !== 0);
              setVisitedStreets(visited);
              const notvisited = streets.filter(street => street.datobesøkt === 0);
              setNotVisitedStreets(notvisited);
          }));
      })();
    }, []);

    useEffect(() => {
      visitedStreets?.length > 0 ? setShowStreets(true) : setShowStreets(false);
      
      if(visitedStreets?.length > 0) {
        (async () => {
        // console.log("we have a visited: ");
        // console.log(visitedStreets[0].adresse);
        // const streetCoords = await visitedStreets.map(street => useOverpass(street.adresse));
        // console.log(streetCoords);
        //const query = lookupStreetCoords + visitedStreets[0].adresse + commune;
        })();
      }
    }, [visitedStreets]);

    useEffect(() => {
      notVisitedStreets?.length > 0 ? setTodoStreets(true) : setTodoStreets(false);
    }, [notVisitedStreets]);

    let streets = [];
    let westye = {}
    westye.id = 1;
    westye.title = "Westye Egebergs gate";
    westye.description = "St.Hanshaugen bydel"
    westye.coords = [[
        10.748911,
        59.921186,
        47
      ],
      [
        10.748903,
        59.921199,
        47
      ],
      [
        10.748868,
        59.921189,
        47
      ],
      [
        10.748428,
        59.921082,
        47
      ],
      [
        10.748032,
        59.921001,
        47
      ],
      [
        10.747728,
        59.920952,
        47.3
      ],
      [
        10.747379,
        59.92091,
        47.6
      ],
      [
        10.746821,
        59.920868,
        48.4
      ],
      [
        10.74669,
        59.920858,
        48.6
      ],
      [
        10.746604,
        59.920852,
        48.8
      ]
    ];
    westye.position = [59.920852,10.746604];
    westye.polyline = westye.coords.map(x => [x[1],x[0]]);
    westye.showstreet = true;
    streets.push(westye);


    let tromso = [{
      "type": "node",
      "id": 106175,
      "lat": 59.9224661,
      "lon": 10.7695804
    },
    {
      "type": "node",
      "id": 1387802085,
      "lat": 59.9225194,
      "lon": 10.7696414
    },
    {
      "type": "node",
      "id": 280723,
      "lat": 59.9257958,
      "lon": 10.7740494
    },
    {
      "type": "node",
      "id": 12534263,
      "lat": 59.9252303,
      "lon": 10.7731653
    },
    {
      "type": "node",
      "id": 12534266,
      "lat": 59.9232725,
      "lon": 10.7705297
    },
    {
      "type": "node",
      "id": 277015592,
      "lat": 59.9244245,
      "lon": 10.7717424
    },
    {
      "type": "node",
      "id": 330463917,
      "lat": 59.9235506,
      "lon": 10.7708693
    },
    {
      "type": "node",
      "id": 1289314850,
      "lat": 59.9245487,
      "lon": 10.7719231
    },
    {
      "type": "node",
      "id": 1289315051,
      "lat": 59.9248010,
      "lon": 10.7724984
    },
    {
      "type": "node",
      "id": 1289315098,
      "lat": 59.9241220,
      "lon": 10.7712810
    },
    {
      "type": "node",
      "id": 1608323063,
      "lat": 59.9257499,
      "lon": 10.7739715
    },
    {
      "type": "node",
      "id": 5044755531,
      "lat": 59.9254947,
      "lon": 10.7735578
    },
    {
      "type": "node",
      "id": 6766958612,
      "lat": 59.9237194,
      "lon": 10.7709602
    },
    {
      "type": "node",
      "id": 6766958613,
      "lat": 59.9240144,
      "lon": 10.7711774
    },
    {
      "type": "node",
      "id": 6766958614,
      "lat": 59.9239203,
      "lon": 10.7711010
    },
    {
      "type": "node",
      "id": 6766958678,
      "lat": 59.9249627,
      "lon": 10.7727693
    },
    {
      "type": "node",
      "id": 6766958679,
      "lat": 59.9254903,
      "lon": 10.7734982
    },
    {
      "type": "node",
      "id": 6766958680,
      "lat": 59.9252664,
      "lon": 10.7731536
    },
    {
      "type": "node",
      "id": 8718418312,
      "lat": 59.9235998,
      "lon": 10.7708958
    },
    {
      "type": "node",
      "id": 832779415,
      "lat": 59.9260544,
      "lon": 10.7755626
    },
    {
      "type": "node",
      "id": 841832148,
      "lat": 59.9260274,
      "lon": 10.7749773
    },
    {
      "type": "node",
      "id": 841832153,
      "lat": 59.9260368,
      "lon": 10.7753252
    },
    {
      "type": "node",
      "id": 841832159,
      "lat": 59.9258898,
      "lon": 10.7742891
    },
    {
      "type": "node",
      "id": 841832169,
      "lat": 59.9259534,
      "lon": 10.7745149
    },
    {
      "type": "node",
      "id": 1608323073,
      "lat": 59.9258431,
      "lon": 10.7741567
    },
    {
      "type": "node",
      "id": 3211546686,
      "lat": 59.9259853,
      "lon": 10.7746459
    },
    {
      "type": "node",
      "id": 3211546691,
      "lat": 59.9260095,
      "lon": 10.7748020
    },
    {
      "type": "node",
      "id": 3211546697,
      "lat": 59.9260356,
      "lon": 10.7754090
    },
    {
      "type": "node",
      "id": 3211546698,
      "lat": 59.9260363,
      "lon": 10.7751201
    },
    {
      "type": "node",
      "id": 3211546699,
      "lat": 59.9260382,
      "lon": 10.7754602
    },
    {
      "type": "node",
      "id": 3211546701,
      "lat": 59.9260392,
      "lon": 10.7752286
    },
    {
      "type": "node",
      "id": 3211546702,
      "lat": 59.9260434,
      "lon": 10.7755113
    }];
    
    return (
      <>
        
        <div className="ui grid">
          <div className="twelve wide computer twelve wide tablet sixteen wide mobile column">
            <div className="ui segment">
            <Map center={defaultPosition} tile={3} places={streets} hot={tromso} streets={allStreets} />
            </div>
          </div>

          <div className="four wide computer our wide tablet sixteen wide mobile column">
            <div className="ui segment" style={{ height: '80vh', backgroundColor: '#FFFFE0', overflowY: 'scroll', marginRight: '10px' }}>
              <div className="ui bulleted list">
                  { showStreets ? 
                    <>
                    <h2>BESØKTE GATER ( {  visitedStreets.length } )</h2>
                    <div>
                      {
                        visitedStreets.map( filteredStreet => (
                          <div className="item"> {filteredStreet.adresse} </div>
                        ))
                      } 
                    </div>
                    </> : <div> NO </div> 
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