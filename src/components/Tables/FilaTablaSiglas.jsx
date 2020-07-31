import React from 'react';

function FilaTablaSiglas (props) {
    const { siglaAgrupada, borrarSigla, seccionesSeleccionadas, elegirSeccion } = props;
    const { sigla, grupos, secciones } = siglaAgrupada;

    const seccionSeleccionada = seccionesSeleccionadas.find(seccionSeleccionada => seccionSeleccionada.sigla === sigla);

    let seccion = 0;
    if (seccionSeleccionada) seccion = seccionSeleccionada.seccion;

    return (
        <tr>
            <td>{sigla}</td>
            <td>{siglaAgrupada.nombre}</td>
            <td>{siglaAgrupada.n_secciones}</td>
            <td>
                <select className="form-control-sm" name={sigla} value={seccion} onChange={elegirSeccion}>
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