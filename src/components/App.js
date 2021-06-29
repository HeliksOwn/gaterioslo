import React, { useState } from 'react';
import OsloKart from './OsloKart';
import Dropdown from './Dropdown/Dropdown';
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';
import Route from './Route';

const App = () => {


    const options = [
      {
        label: 'Fargen rød',
        value: 'red'
      },
      {
        label: 'Fargen gul',
        value: 'yellow'
      },
      {
        label: 'Fargen grønn',
        value: 'green'
      },
      {
        label: 'Fargen blå',
        value: 'blue'
      }
    ];
  
  const [selected, setSelected] = useState(options[0]);
  
  const showOptionsPage = () => {
    if (window.location.pathname === 'dropdown') {
      return <Dropdown selected={selected} onSelectedChange={setSelected} options={options} />;
    }
  }

  const showMapPage = () => {
    if (window.location.pathname === 'map') {
      return <OsloKart />;
    }
  }
  
  return (
    <>
      <div>
        <Header />
        {/* {showOptionsPage}
        {showMapPage} */}

        <Route path="/">
          <OsloKart />
        </Route>
        <Route path="/map">
          <OsloKart />
        </Route>
        <Route path="/dropdown">
        <Dropdown selected={selected} onSelectedChange={setSelected} options={options} />
        </Route>
        
        <br /><br /><br />
      </div>
    </>
  )
}


export default App;