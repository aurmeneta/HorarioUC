import React from 'react';
import FilaCombinacion from './FilaCombinacion';

class TablaCombinacion extends React.Component {
  render() {
    const { combinacion } = this.props;

    return (
      <div className="col-md table-responsive">
        <table className="table-sm table">
          <thead>
            <tr>
              <th>Sigla</th>
              <th>Nombre</th>
              <th>Sección</th>
              <th>NRC</th>
              <th>Profesor</th>
              <th>Cupos disponibles</th>
              <th>Detalle cupos</th>
            </tr>
          </thead>

          <tbody>
            {
                        combinacion.map((grupo) => <FilaCombinacion key={grupo.sigla} grupo={grupo} {...this.props} />)
                    }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TablaCombinacion;
