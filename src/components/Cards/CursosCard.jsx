import React from 'react';

import TablaSiglas from "../TablaSiglas";

class CursosCard extends React.Component {
    render() {

        const { siglasAgrupadas } = this.props;
        return (
            <div className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Tus cursos</h5>
                        <TablaSiglas siglasAgrupadas={siglasAgrupadas}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CursosCard;