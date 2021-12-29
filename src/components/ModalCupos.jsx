import "bootstrap/dist/js/bootstrap.bundle"
import React from "react";

import { obtenerCupos } from "../Util/util";
import TablaCupos from "./Tables/TablaCupos";

class ModalCupos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cupos: {},
            cargando: true
        }
    }

    obtenerCupos() {
        if (this.props.curso.nrc) {
            this.setState({ cargando: true })
            obtenerCupos(this.props.periodo, this.props.curso.nrc)
                .then(cupos => this.setState({ cupos, cargando: false }))
        }
    }

    componentDidMount() {
        this.obtenerCupos()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.curso.nrc !== this.props.curso.nrc) {
            this.obtenerCupos()
        }
    }

    render() {
        const { curso } = this.props

        if (this.state.cargando) {
            return(
                <div className="modal" tabIndex="-1" id="modalCupos">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{`${curso.sigla} - ${curso.nombre}`}</h5>
                                <button className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="spinner-border">
                                    <span className="sr-only">Cargando...</span>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            
        } else {
            return (
                <div className="modal" tabIndex="-1" id="modalCupos">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{`${curso.sigla} - ${curso.nombre}`}</h5>
                                <button className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-0">
                                <TablaCupos cupos={this.state.cupos}/>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ModalCupos
