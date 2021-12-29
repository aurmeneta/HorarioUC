import React from 'react';
import PropTypes from 'prop-types';

import FilaCupos from './FilaCupos';

function TablaCupos(props) {
  const { cupos } = props;
  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="pl-3">Escuela</th>
            <th>Vacantes ofrecidas</th>
            <th>Vacantes ocupadas</th>
            <th>Vacantes libres</th>
          </tr>
        </thead>
        <tbody>
          {cupos.cupos.map((cupo) => <FilaCupos cupo={cupo} key={cupo.escuela} />)}
        </tbody>
      </table>
    </div>
  );
}

TablaCupos.propTypes = {
  cupos: PropTypes.shape({
    escuela: PropTypes.string,
    nrc: PropTypes.string,
    cupos: PropTypes.arrayOf(PropTypes
      .shape({
        nrc: PropTypes.string,
        sigla: PropTypes.string,
        vacantesDisponibles: PropTypes.number,
        cupos: PropTypes.arrayOf(PropTypes.shape({
          escuela: PropTypes.string,
          vacantesDisponibles: PropTypes.number,
          vacantesOcupadas: PropTypes.number,
          vacantesOfrecidas: PropTypes.number,
        })),
      })),
  }).isRequired,
};

export default TablaCupos;
