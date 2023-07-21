/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { DIAS, HORA_MODULOS } from '../../util/util';

function FilaHorario(props) {
  const { index, dia, tipo_semestre } = props;
  return (
    <tr key={DIAS[index]}>
      <td key={index}>{HORA_MODULOS[tipo_semestre][index]}</td>
      {
        dia.map((cursos, i) => (
          <td className="p-0" key={DIAS[i]}>
            {
                  cursos.length > 0
                    ? cursos.map((curso) => (
                      <div key={curso.sigla} className={`${curso.tipo} modulo-cell`}>
                        {`${curso.sigla}-${curso.secciones.toString()}`}
                      </div>
                    ))
                    : '-'
                }
          </td>
        ))
      }
    </tr>
  );
}

function FilaAlmuerzo() {
  return (
    <tr>
      <td id="almuerzo" colSpan={DIAS.length + 1}>ALMUERZO</td>
    </tr>
  );
}

FilaHorario.propTypes = {
  index: PropTypes.number.isRequired,
  dia: PropTypes
    .arrayOf(PropTypes
      .arrayOf(PropTypes
        .shape({
          secciones: PropTypes.arrayOf(PropTypes.number),
          sigla: PropTypes.string,
          tipo: PropTypes.string,
        }))).isRequired,
  tipo_semestre: PropTypes.string.isRequired
};

export { FilaHorario };
export { FilaAlmuerzo };
