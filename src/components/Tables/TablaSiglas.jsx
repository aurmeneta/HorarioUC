import React from 'react';

import FilaTablaSiglas from "./FilaTablaSiglas";

class TablaSiglas extends React.Component {
    render(){
        let { siglasAgrupadas, borrarSigla, elegirSeccion, seccionesSeleccionadas } = this.props;

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
                    siglasAgrupadas.map(siglaAgrupada =>
                        <FilaTablaSiglas
                            key={siglaAgrupada.sigla}
                            siglaAgrupada={siglaAgrupada}
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