import React from 'react';
import './Header.css';

function Header({ username }) {
  return (
    <header className="head">
      <div className="header__logo">
        <img className="pic-logo" src={require("../images/logo.jpg")} alt="Logo" />
      </div>
      <div className="header__title">
        <h1>Blabber</h1>
      </div>
      <div className='username_title'>
        {username && <h2>Hello, {username}</h2>}
      </div>
    </header>
  );
}

export default Header;
