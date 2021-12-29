import React from "react";

import FilaCupos from "./FilaCupos";

class TablaCupos extends React.Component {
    render() {
        console.log(this.props.cupos)
        return(
            <div className="table-responsive">
               <table className="table table-sm">
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
            </div> 
       )
    }
}

export default TablaCupos