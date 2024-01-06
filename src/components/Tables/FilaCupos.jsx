import React from 'react';
import PropTypes from 'prop-types';

function FilaCupos({ cupo, columnasIncluir }) {
  return (
    <tr>
      <td className="ps-3">{cupo.escuela}</td>
      {columnasIncluir.nivel && <td>{cupo.nivel}</td>}
      {columnasIncluir.programa && <td>{cupo.programa}</td>}
      {columnasIncluir.concentracion && <td>{cupo.concentracion}</td>}
      {columnasIncluir.cohorte && <td>{cupo.cohorte}</td>}
      {columnasIncluir.admision && <td>{cupo.admision}</td>}
      <td>{cupo.vacantesOfrecidas}</td>
      <td>{cupo.vacantesOcupadas}</td>
      <th>{cupo.vacantesDisponibles}</th>
    </tr>
  );
}

FilaCupos.propTypes = {
  cupo: PropTypes.shape({
    escuela: PropTypes.string,
    vacantesDisponibles: PropTypes.number,
    vacantesOcupadas: PropTypes.number,
    vacantesOfrecidas: PropTypes.number,
    nivel: PropTypes.string,
    programa: PropTypes.string,
    concentracion: PropTypes.string,
    cohorte: PropTypes.string,
    admision: PropTypes.string,
  }).isRequired,
  columnasIncluir: PropTypes.shape({
    nivel: PropTypes.bool,
    programa: PropTypes.bool,
    concentracion: PropTypes.bool,
    cohorte: PropTypes.bool,
    admision: PropTypes.bool,
  }).isRequired,
};

export default FilaCupos;
