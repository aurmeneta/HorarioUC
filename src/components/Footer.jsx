import React from 'react';

function Footer() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-text text-center w-100">
          Colabora con este proyecto en
          {' '}
          <a href="https://github.com/aurmeneta/HorarioUC">GitHub</a>
        </span>
      </div>
    </nav>
  );
}

export default Footer;
