import React from 'react';


const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
          Default
      </a>
      <a href="/map" className="item">
          Kart
      </a>
      <a href="/dropdown" className="item">
          Nedtrekk
      </a>
    </div>
  );
} 

export default Header;