import React from 'react';

class FilaCombinacion extends React.Component {
  render() {
    const { grupo, guardarCursoCupos } = this.props;
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
              data-toggle="modal"
              onClick={() => guardarCursoCupos({
                nrc: primeraSeccion.nrc,
                sigla: `${primeraSeccion.sigla}-${primeraSeccion.seccion}`,
                nombre: primeraSeccion.nombre,
              })}
              data-target="#modalCupos"
            >
              Ver cupos
            </button>
          </td>
        </tr>
        {
                    secciones.map(({
                      seccion, nrc, profesor, vacantes_disponibles, sigla, nombre,
                    }) => (
                      <tr key={seccion}>
                        <td>{seccion}</td>
                        <td>{nrc}</td>
                        <td>{profesor.toLocaleString().replace(',', ', ')}</td>
                        <td>{vacantes_disponibles}</td>
                        <td>
                          <button
                            className="btn btn-link btn-sm"
                            data-toggle="modal"
                            onClick={() => guardarCursoCupos({ nrc, sigla: `${sigla}-${seccion}`, nombre })}
                            data-target="#modalCupos"
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
}

export default FilaCombinacion;
