import React from "react";

import FilaCupos from "./FilaCupos";

class TablaCupos extends React.Component {
    render() {
        console.log(this.props.cupos)
        return(
            <table className="table table-sm table-responsive">
                <thead>
                    <tr>
                        <th className="pl-3">Escuela</th>
                        <th>Vacantes ofrecidas</th>
                        <th>Vacantes ocupadas</th>
                        <th>Vacantes libres</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cupos.cupos.map(cupo => <FilaCupos cupo={cupo} key={cupo.escuela}/>)}
                </tbody>
            </table>
       )
    }
}

export default TablaCupos