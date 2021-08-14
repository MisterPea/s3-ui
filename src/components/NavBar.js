import * as React from 'react';
import MainLogo from './MainLogo';

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo-lg"><MainLogo /></div>
      <p className="contact-btn">Contact</p>
    </div>
  );
}
