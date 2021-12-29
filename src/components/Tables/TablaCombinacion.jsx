import React from "react";
import FilaCombinacion from "./FilaCombinacion";

class TablaCombinacion extends React.Component {
    render() {
        const { combinacion } = this.props;

        return (
            <div className="col-md table-responsive">
                <table className="table-sm table">
                    <thead>
                        <tr>
                            <th>Sigla</th>
                            <th>Nombre</th>
                            <th>Sección</th>
                            <th>NRC</th>
                            <th>Profesor</th>
                            <th>Vacantes disponibles</th>
                            <th>Detalle vacantes</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        combinacion.map((grupo) => <FilaCombinacion key={grupo.sigla} grupo={grupo}/>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TablaCombinacion;