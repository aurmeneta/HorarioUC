import React from 'react';
import {DIAS, HORA_MODULOS} from '../../util.js';

function FilaHorario(props)  {
    let {index, dia} = props;
    return (
        <tr key={DIAS[index]}>
            <td key="99">{HORA_MODULOS[index]}</td>
            {
                dia.map((hora, index) => <td key={index} className={hora.tipo}>{`${hora.sigla}-${hora.secciones.toString()}`}</td>)
            }
        </tr>
    )
}

function FilaAlmuerzo() {
    return (
        <tr>
            <td id="almuerzo" colSpan={6}>ALMUERZO</td>
        </tr>
    )
}

export { FilaHorario };
export { FilaAlmuerzo };