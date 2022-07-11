import React from 'react';
import PropTypes from 'prop-types';
import Grupo from '../../util/Grupo';

function FilaCombinacion(props) {
  const { grupo, guardarCursoCupos } = props;
  const { nombre, sigla } = grupo;
  let secciones = [...grupo.secciones];
  secciones = secciones.sort((s1, s2) => s1.seccion - s2.seccion);
  const { length } = secciones;
  const primeraSeccion = secciones.shift();

  if (!primeraSeccion) return (<p>No hay primera seccion</p>);

  return (
    <>
      <tr>
        <td rowSpan={length} className="align-middle">{sigla}</td>
        <td rowSpan={length} className="align-middle">{nombre}</td>
        <td>{primeraSeccion.seccion}</td>
        <td>{primeraSeccion.nrc}</td>
        <td>{primeraSeccion.profesor.toLocaleString().replace(',', ', ')}</td>
        <td>{primeraSeccion.vacantes_disponibles}</td>
        <td>
          <button
            className="btn btn-link btn-sm"
            type="button"
            data-bs-toggle="modal"
            onClick={() => guardarCursoCupos({
              nrc: primeraSeccion.nrc,
              sigla: `${primeraSeccion.sigla}-${primeraSeccion.seccion}`,
              nombre: primeraSeccion.nombre,
            })}
            data-bs-target="#modalCupos"
          >
            Ver cupos
          </button>
        </td>
      </tr>
      {
        secciones.map(({
          seccion, nrc, profesor, vacantes_disponibles: vacantesDisponibles,
        }) => (
          <tr key={seccion}>
            <td>{seccion}</td>
            <td>{nrc}</td>
            <td>{profesor.toLocaleString().replace(',', ', ')}</td>
            <td>{vacantesDisponibles}</td>
            <td>
              <button
                className="btn btn-link btn-sm"
                data-bs-toggle="modal"
                type="button"
                onClick={() => guardarCursoCupos({ nrc, sigla: `${sigla}-${seccion}`, nombre })}
                data-bs-target="#modalCupos"
              >
                Ver cupos
              </button>
            </td>
          </tr>
        ))
      }
    </>
  );
}

FilaCombinacion.propTypes = {
  grupo: PropTypes.instanceOf(Grupo).isRequired,
  guardarCursoCupos: PropTypes.func.isRequired,
};

export default FilaCombinacion;
