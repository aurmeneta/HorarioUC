import React from 'react';
import PropTypes from 'prop-types';

import TablaSiglas from '../Tables/TablaSiglas';
import ErrorBoundary from '../ErrorBoundary';
import Grupo from '../../util/Grupo';
import Sigla from '../../util/Sigla';

function CursosCard(props) {
  const {
    siglas, borrarSigla, combinaciones, elegirSeccion, seccionesSeleccionadas,
  } = props;
  return (
    <div className="col">
      <div className="card border-0">
        <div className="card-body">
          <ErrorBoundary>
            <h5 className="card-title">Tus cursos</h5>
            <TablaSiglas
              siglas={siglas}
              borrarSigla={borrarSigla}
              elegirSeccion={elegirSeccion}
              seccionesSeleccionadas={seccionesSeleccionadas}
            />
            <p>{`${combinaciones.length} combinaciones`}</p>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

CursosCard.propTypes = {
  combinaciones: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Grupo))).isRequired,
  borrarSigla: PropTypes.func.isRequired,
  elegirSeccion: PropTypes.func.isRequired,
  siglas: PropTypes.arrayOf(PropTypes.instanceOf(Sigla)).isRequired,
  seccionesSeleccionadas: PropTypes
    .arrayOf(PropTypes
      .shape({
        seccion: PropTypes.number,
        sigla: PropTypes.string,
      })).isRequired,
};

export default CursosCard;
