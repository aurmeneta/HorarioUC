import React from 'react';

import BuscarCursoForm from "../BuscarCursoForm";

class BuscarCursoCard extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Buscar cursos</h5>
                        <BuscarCursoForm agregarSigla={this.props.agregarSigla}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuscarCursoCard;