import React from 'react';

import FilaTablaSiglas from "./FilaTablaSiglas";

class TablaSiglas extends React.Component {
    render(){
        let { siglasAgrupadas } = this.props;

        return (
            <table className="table table-sm table-responsive-md">
                <thead>
                    <tr>
                        <th>Sigla</th>
                        <th>Nombre</th>
                        <th>Secciones</th>
                        <th>Horarios</th>
                    </tr>
                </thead>

                <tbody>
                {
                    siglasAgrupadas.map(siglaAgrupada => <FilaTablaSiglas key={siglaAgrupada.sigla} siglaAgrupada={siglaAgrupada}/>)
                }
                </tbody>
            </table>
        )
    }
}

export default TablaSiglas;