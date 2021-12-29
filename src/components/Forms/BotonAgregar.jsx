import React from 'react';
import PropTypes from 'prop-types';

function BotonAgregar(props) {
  const { onClick, buscando } = props;

  if (buscando) {
    return (
      <button className="btn btn-warning" type="button">Buscando...</button>
    );
  }
  return <button className="btn btn-success" onClick={onClick} type="button">Agregar</button>;
}

BotonAgregar.propTypes = {
  onClick: PropTypes.func.isRequired,
  buscando: PropTypes.bool.isRequired,
};

export default BotonAgregar;
