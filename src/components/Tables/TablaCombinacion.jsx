import React from 'react';
import PropTypes from 'prop-types';

import FilaCombinacion from './FilaCombinacion';
import Grupo from '../../util/Grupo';

function TablaCombinacion(props) {
  const { combinacion, guardarCursoCupos } = props;

  return (
    <div className="col-xl table-responsive">
      <table className="table-sm table">
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nombre</th>
            <th>Sección</th>
            <th>NRC</th>
            <th>Profesor</th>
            <th>Cupos disponibles</th>
            <th>Detalle cupos</th>
          </tr>
        </thead>

        <tbody>
          {
            combinacion.map((grupo) => (
              <FilaCombinacion
                key={grupo.sigla}
                grupo={grupo}
                guardarCursoCupos={guardarCursoCupos}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TablaCombinacion.propTypes = {
  combinacion: PropTypes.arrayOf(PropTypes.instanceOf(Grupo)).isRequired,
  guardarCursoCupos: PropTypes.func.isRequired,
};

export default TablaCombinacion;
