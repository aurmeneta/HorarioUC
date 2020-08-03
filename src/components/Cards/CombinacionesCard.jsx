import React from 'react';

import Horario from "../Tables/Horario";
import TablaCombinacion from "../Tables/TablaCombinacion";
import ErrorBoundary from "../ErrorBoundary";

class CombinacionesCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }

        this.siguiente = this.siguiente.bind(this);
        this.anterior = this.anterior.bind(this);
    }

    siguiente(event) {
        event.preventDefault();

        this.setState(state => {
                let { index } = state;
                const { combinaciones } = this.props;

                if (index >= (combinaciones.length - 1)) return {index: (combinaciones.length - 1)}
                else return {index: index + 1}
            });
    }

    anterior(event) {
        event.preventDefault();

        this.setState(state => {
            let { index } = state;

            if (index > 0) return {index: index - 1};
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevCom = prevProps.combinaciones;
        let newCom = this.props.combinaciones;

        if (prevCom !== newCom) {
            this.setState({index: 0})
        }

    }


    render() {
        const { combinaciones } = this.props;
        const { length } = combinaciones;
        let { index } = this.state;

        if (index >= length && length !== 0) {
            index = length - 1;
        } else if (length === 0 && index !== 0) {
            index = 0;
        }




        return (
            <div className="col">
                <div className="card border-0">
                    <div className="card-body">
                        <ErrorBoundary>
                            <h5 className="card-title">{"Combinación " + (index + 1)}</h5>

                            <div className="text-center m-2 btn-group">
                                <button className="btn btn-secondary" onClick={this.anterior}>Anterior</button>
                                <button className="btn btn-secondary" onClick={this.siguiente}>Siguiente</button>
                            </div>

                            {
                                combinaciones.length === 0 ? <p>No hay combinaciones</p> :
                                    <div className="row">
                                        <Horario combinacion={combinaciones[index]}/>
                                        <TablaCombinacion combinacion={combinaciones[index]}/>
                                        <br/>
                                    </div>
                            }
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        )
    }

}

export default CombinacionesCard;