import React from 'react';
import PropTypes from 'prop-types';

import Sigla from '../../util/Sigla';

function FilaTablaSiglas(props) {
  const {
    sigla, borrarSigla, seccionesSeleccionadas, elegirSeccion,
  } = props;
  const { sigla: stringSigla, grupos, secciones } = sigla;

  const nSeccionSeleccionada = seccionesSeleccionadas[stringSigla] || 0;

  return (
    <tr>
      <td>{stringSigla}</td>
      <td>{sigla.nombre}</td>
      <td>{sigla.n_secciones}</td>
      <td>
        <select className="form-control-sm w-75" name={stringSigla} value={nSeccionSeleccionada} onChange={elegirSeccion}>
          <option value={0}>Todas</option>
          {
            secciones.map(({ seccion, profesor }) => <option key={seccion} value={seccion}>{`${seccion} - ${profesor.join(', ')}`}</option>)
          }
        </select>
      </td>
      <td>{grupos.length}</td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={(event) => borrarSigla(event, sigla)}
        >
          X
        </button>
      </td>
    </tr>
  );
}

FilaTablaSiglas.propTypes = {
  sigla: PropTypes.instanceOf(Sigla).isRequired,
  borrarSigla: PropTypes.func.isRequired,
  elegirSeccion: PropTypes.func.isRequired,
  seccionesSeleccionadas: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default FilaTablaSiglas;
