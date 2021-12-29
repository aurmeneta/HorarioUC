/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { DIAS, HORA_MODULOS } from '../../Util/util';

function FilaHorario(props) {
  const { index, dia } = props;
  return (
    <tr key={DIAS[index]}>
      <td key="99">{HORA_MODULOS[index]}</td>
      {
        dia.map((hora, idx) => <td key={idx} className={hora.tipo}>{`${hora.sigla}-${hora.secciones.toString()}`}</td>)
      }
    </tr>
  );
}

function FilaAlmuerzo() {
  return (
    <tr>
      <td id="almuerzo" colSpan={6}>ALMUERZO</td>
    </tr>
  );
}

FilaHorario.propTypes = {
  index: PropTypes.number.isRequired,
  dia: PropTypes
    .arrayOf(PropTypes
      .shape({
        secciones: PropTypes.arrayOf(PropTypes.number),
        sigla: PropTypes.string,
        tipo: PropTypes.string,
      })).isRequired,
};

export { FilaHorario };
export { FilaAlmuerzo };
