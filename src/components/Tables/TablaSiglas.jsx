import React from 'react';
import PropTypes from 'prop-types';

import FilaTablaSiglas from './FilaTablaSiglas';
import Sigla from '../../Util/Sigla';

function TablaSiglas(props) {
  const {
    siglas, borrarSigla, elegirSeccion, seccionesSeleccionadas,
  } = props;

  return (
    <table className="table table-sm table-responsive-md">
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
