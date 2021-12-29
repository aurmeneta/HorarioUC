import React from "react";

function FilaCupos ({ cupo }) {
    return (
        <tr>
            <td>{cupo.escuela}</td>
            <td>{cupo.vacantesOfrecidas}</td>
            <td>{cupo.vacantesOcupadas}</td>
            <th>{cupo.vacantesDisponibles}</th>
        </tr>
    )
}

export default FilaCupos