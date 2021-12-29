import React from "react";

function FilaCupos ({ cupo }) {
    return (
        <tr>
            <td className="pl-3">{cupo.escuela}</td>
            <td>{cupo.vacantesOfrecidas}</td>
            <td>{cupo.vacantesOcupadas}</td>
            <th>{cupo.vacantesDisponibles}</th>
        </tr>
    )
}

export default FilaCupos