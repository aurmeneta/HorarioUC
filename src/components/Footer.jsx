import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container-fluid text-center">
        <span className="navbar-text w-100">
          Colabora con este proyecto en
          {' '}

        </span>
        <a href="https://github.com/aurmeneta/HorarioUC">GitHub</a>
        <br />
        <span className="navbar-text w-100">
          Si tienes algún comentario o sugerencia, por favor deja tu feedback en este
          {' '}
        </span>
        <a href="https://forms.gle/WitMyxhgqR5BhZgMA" target="_blank" rel="noreferrer">formulario</a>
        {' '}
        o abre un Issue en GitHub.
        <br />
        <span className="w-100 navbar-text">{`v${process.env.npm_package_version}`}</span>

      </div>
    </footer>
  );
}

export default Footer;
