import React from 'react';
import Link from './Links';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/" className="item">
          Default
      </Link>
      <Link href="/map" className="item">
          Kart
      </Link>
      <Link href="/dropdown" className="item">
          Nedtrekk
      </Link>
    </div>
  );
} 

export default Header;