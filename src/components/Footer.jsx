import React from 'react';

function Footer() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid text-center">
        <span className="navbar-text w-100">
          Colabora con este proyecto en
          {' '}
          <a href="https://github.com/aurmeneta/HorarioUC">GitHub</a>
        </span>
        <br />
        <span className="w-100 navbar-text">
          <span className="badge bg-info">NUEVO</span>
          {' '}
          Prueba generar combinaciones con choques de ayudantías
          {' '}
          <a href="https://staging.horariouc.cl">acá.</a>
        </span>
      </div>
    </nav>
  );
}

export default Footer;
