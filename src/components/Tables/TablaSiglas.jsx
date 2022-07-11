import React from 'react';
import PropTypes from 'prop-types';

import FilaTablaSiglas from './FilaTablaSiglas';
import Sigla from '../../util/Sigla';

function TablaSiglas(props) {
  const {
    siglas, borrarSigla, elegirSeccion, seccionesSeleccionadas,
  } = props;

  return (
    <div className="table-responsive-md">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Nombre</th>
            <th>Secciones</th>
            <th>Sección</th>
            <th>Horarios</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {
            siglas.map((sigla) => (
              <FilaTablaSiglas
                key={sigla.sigla}
                sigla={sigla}
                borrarSigla={borrarSigla}
                elegirSeccion={elegirSeccion}
                seccionesSeleccionadas={seccionesSeleccionadas}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TablaSiglas.propTypes = {
  siglas: PropTypes.arrayOf(PropTypes.instanceOf(Sigla)).isRequired,
  borrarSigla: PropTypes.func.isRequired,
  elegirSeccion: PropTypes.func.isRequired,
  seccionesSeleccionadas: PropTypes
    .arrayOf(PropTypes
      .shape({
        seccion: PropTypes.number,
        sigla: PropTypes.string,
      })).isRequired,
};

export default TablaSiglas;
