import React from 'react';

function FilaTablaSiglas (props) {
    const { sigla, borrarSigla, seccionesSeleccionadas, elegirSeccion } = props;
    const { sigla: string_sigla, grupos, secciones } = sigla;

    const seccionSeleccionada = seccionesSeleccionadas.find(seccionSeleccionada => seccionSeleccionada.sigla === string_sigla);

    let nSeccionSeleccionada = 0;
    if (seccionSeleccionada) nSeccionSeleccionada = seccionSeleccionada.seccion;

    return (
        <tr>
            <td>{string_sigla}</td>
            <td>{sigla.nombre}</td>
            <td>{sigla.n_secciones}</td>
            <td>
                <select className="form-control-sm" name={string_sigla} value={nSeccionSeleccionada} onChange={elegirSeccion}>
                    <option value={0}>Todas</option>
                    {
                        secciones.map(({seccion}, index) => <option key={index} value={seccion}>{seccion}</option>)
                    }
                </select>
            </td>
            <td>{grupos.length}</td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={(event) => borrarSigla(event, sigla)}>X</button>
            </td>
        </tr>
    );
}

export default FilaTablaSiglas;