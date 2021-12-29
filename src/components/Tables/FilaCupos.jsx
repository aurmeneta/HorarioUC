import React from 'react';
import PropTypes from 'prop-types';

function FilaCupos({ cupo }) {
  return (
    <tr>
      <td className="pl-3">{cupo.escuela}</td>
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
  }).isRequired,
};

export default FilaCupos;
