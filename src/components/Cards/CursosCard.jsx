import React from 'react';

import TablaSiglas from "../Tables/TablaSiglas";
import ErrorBoundary from "../ErrorBoundary";

class CursosCard extends React.Component {
    render() {

        const { siglas, borrarSigla, combinaciones, elegirSeccion, seccionesSeleccionadas} = this.props;
        return (
            <div className="col-md">
                <div className="card border-0">
                    <div className="card-body">
                        <ErrorBoundary>
                            <h5 className="card-title">Tus cursos</h5>
                            <TablaSiglas
                                {...this.props}/>
                            <p>{combinaciones.length + " combinaciones"}</p>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }
}

export default CursosCard;