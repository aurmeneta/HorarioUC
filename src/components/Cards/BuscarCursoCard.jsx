import React from 'react';

import BuscarCursoForm from "../Forms/BuscarCursoForm";
import AlertaErrorEnBusqueda from "../Alertas/AlertaErrorEnBusqueda";
import ErrorBoundary from "../ErrorBoundary";

class BuscarCursoCard extends React.Component {
    render() {
        const { agregarSigla, buscando, errorEnBusqueda } = this.props;

        return (
            <div className="col-md-4">
                <div className="card border-0">
                    <div className="card-body">
                        <ErrorBoundary>
                            <h5 className="card-title">Buscar cursos</h5>
                            <BuscarCursoForm agregarSigla={agregarSigla} buscando={buscando}/>
                            <AlertaErrorEnBusqueda errorEnBusqueda={errorEnBusqueda}/>
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuscarCursoCard;