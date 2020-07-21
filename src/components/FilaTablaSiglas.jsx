import React from 'react';

function FilaTablaSiglas (props) {
    let { siglaAgrupada } = props;
    return (
        <tr>
            <td>{siglaAgrupada.sigla}</td>
            <td>{siglaAgrupada.nombre}</td>
            <td>{siglaAgrupada.n_secciones}</td>
            <td>{siglaAgrupada.grupos.length}</td>
        </tr>
    );
}

export default FilaTablaSiglas;