import React from 'react';

import FilaTablaSiglas from "./FilaTablaSiglas";

class TablaSiglas extends React.Component {
    render(){
        let { siglas, borrarSigla, elegirSeccion, seccionesSeleccionadas } = this.props;

        return (
            <table className="table table-sm table-responsive-md">
                <thead>
                    <tr>
                        <th>Sigla</th>
                        <th>Nombre</th>
                        <th>Secciones</th>
                        <th>Sección</th>
                        <th>Horarios</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                {
                    siglas.map(sigla =>
                        <FilaTablaSiglas
                            key={sigla.sigla}
                            sigla={sigla}
                            borrarSigla={borrarSigla}
                            elegirSeccion={elegirSeccion}
                            seccionesSeleccionadas={seccionesSeleccionadas}
                        />)
                }
                </tbody>
            </table>
        )
    }
}

export default TablaSiglas;