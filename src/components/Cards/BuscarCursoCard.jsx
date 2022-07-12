import React from 'react';
import PropTypes from 'prop-types';

import BuscarCursoForm from '../Forms/BuscarCursoForm';
import AlertaErrorEnBusqueda from '../Alertas/AlertaErrorEnBusqueda';
import ErrorBoundary from '../ErrorBoundary';

import { periodoSeleccionado } from '../../util/storage';

function BuscarCursoCard(props) {
  const {
    agregarSigla, buscando, errorEnBusqueda, periodo, elegirPeriodo,
  } = props;

  return (
    <div className="col-md-4">
      <div className="card border-0">
        <div className="card-body">
          <ErrorBoundary>
            <h5 className="card-title">Buscar cursos</h5>
            <BuscarCursoForm
              agregarSigla={agregarSigla}
              buscando={buscando}
              periodo={periodo}
              elegirPeriodo={elegirPeriodo}
            />
            <AlertaErrorEnBusqueda errorEnBusqueda={errorEnBusqueda} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

BuscarCursoCard.propTypes = {
  agregarSigla: PropTypes.func.isRequired,
  buscando: PropTypes.bool,
  errorEnBusqueda: PropTypes.string,
  periodo: PropTypes.string,
  elegirPeriodo: PropTypes.func,
};

BuscarCursoCard.defaultProps = {
  buscando: false,
  errorEnBusqueda: '',
  periodo: periodoSeleccionado(),
  elegirPeriodo: () => null,
};

export default BuscarCursoCard;
