import React from 'react';
import PropTypes from 'prop-types';

import FilaCupos from './FilaCupos';

function TablaCupos(props) {
  const { cupos } = props;

  const nivel = cupos.cupos.some((cupo) => cupo.nivel !== '');
  const programa = cupos.cupos.some((cupo) => cupo.programa !== '');
  const concentracion = cupos.cupos.some((cupo) => cupo.concentracion !== '');
  const cohorte = cupos.cupos.some((cupo) => cupo.cohorte !== '');
  const admision = cupos.cupos.some((cupo) => cupo.admision !== '');

  const columnasIncluir = {
    nivel, programa, concentracion, cohorte, admision,
  };

  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="ps-3">Escuela</th>
            {nivel && <th>Nivel</th>}
            {programa && <th>Programa</th>}
            {concentracion && <th>Concentración</th>}
            {cohorte && <th>Cohorte</th>}
            {admision && <th>Admisión</th>}
            <th>Vacantes ofrecidas</th>
            <th>Vacantes ocupadas</th>
            <th>Vacantes libres</th>
          </tr>
        </thead>
        <tbody>
          {cupos.cupos.map((cupo) => (
            <FilaCupos
              cupo={cupo}
              key={cupo.escuela}
              columnasIncluir={columnasIncluir}
            />
          ))}
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
          nivel: PropTypes.string,
          programa: PropTypes.string,
          concentracion: PropTypes.string,
          cohorte: PropTypes.string,
          admision: PropTypes.string,
          vacantesDisponibles: PropTypes.number,
          vacantesOcupadas: PropTypes.number,
          vacantesOfrecidas: PropTypes.number,
        })),
      })),
  }).isRequired,
};

export default TablaCupos;
