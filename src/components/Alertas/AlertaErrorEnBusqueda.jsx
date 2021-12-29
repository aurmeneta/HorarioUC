import React from 'react';
import PropTypes from 'prop-types';

function AlertaErrorEnBusqueda(props) {
  const { errorEnBusqueda } = props;

  if (errorEnBusqueda) {
    return (
      <div className="alert alert-danger mt-2 w-auto">
        {errorEnBusqueda || ''}
      </div>
    );
  }
  return null;
}

AlertaErrorEnBusqueda.propTypes = {
  errorEnBusqueda: PropTypes.string.isRequired,
};

export default AlertaErrorEnBusqueda;
