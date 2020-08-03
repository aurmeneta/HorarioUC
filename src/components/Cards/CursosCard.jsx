import React from 'react';

import TablaSiglas from "../Tables/TablaSiglas";
import ErrorBoundary from "../ErrorBoundary";

class CursosCard extends React.Component {
    render() {

        const { siglasAgrupadas, borrarSigla, combinaciones, elegirSeccion, seccionesSeleccionadas} = this.props;
        return (
            <div className="col-md">
                <div className="card border-0">
                    <div className="card-body">
                        <ErrorBoundary>
                            <h5 className="card-title">Tus cursos</h5>
                            <TablaSiglas
                                siglasAgrupadas={siglasAgrupadas}
                                borrarSigla={borrarSigla}
                                elegirSeccion={elegirSeccion}
                                seccionesSeleccionadas={seccionesSeleccionadas}/>
                            <p>{combinaciones.length + " combinaciones"}</p>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }
}

export default CursosCard;