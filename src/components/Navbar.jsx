import React from 'react';
import 'bootstrap/js/dist/collapse';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">HorarioUC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/choques.html">Configurar choques</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
