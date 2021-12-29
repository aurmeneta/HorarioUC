import React from 'react';

function BotonAgregar(props) {
  const { onClick, buscando } = props;

  if (buscando) {
    return (
      <button className="btn btn-warning">Buscando...</button>
    );
  }
  return <button className="btn btn-success" onClick={onClick}>Agregar</button>;
}

export default BotonAgregar;
