import React from 'react';
import { DIAS, NUMERO_MODULOS } from '../../Util/util';
import { FilaHorario, FilaAlmuerzo } from './FilasHorario';

class Horario extends React.Component {
  render() {
    const { combinacion } = this.props;
    if (!combinacion) return (<p>¡No hay combinación!</p>);

    // TODO: permitir choque de horarios.
    // Inicializa un array de dos dimensiones para almacenar los cursos correspondientes a cada módulo.
    // La primera dimensión corresponde a los modulos y la segunda a los días.
    const modulos = [];

    for (let i = 0; i < NUMERO_MODULOS; i++) {
      const dias = [];
      for (let j = 0; j < DIAS.length; j++) {
        // Añade un objeto vacío.
        dias.push({
          tipo: '',
          secciones: [],
          sigla: '',
        });
      }
      modulos.push(dias);
    }

    // Asigna a cada grupo de la combinación los módulos correspondientes.
    combinacion.forEach((grupo) => {
      const { sigla } = grupo;

      const numerosSecciones = grupo.secciones.map((curso) => curso.seccion);
      numerosSecciones.sort((a, b) => a - b);

      grupo.horario.forEach((horario) => {
        const dia = DIAS.indexOf(horario.dia);
        const { hora } = horario;
        const { tipo } = horario;

        // Comprueba que el grupo tenga un horario valido.
        if (hora < 1 || hora > NUMERO_MODULOS || horario.dia === 'SIN HORARIO') return;

        modulos[hora - 1][dia] = { sigla, tipo, secciones: numerosSecciones };
      });
    });

    return (
      <div className="col-lg table-responsive">
        <table className="table table-bordered table-sm text-center" id="horario">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>L</th>
              <th>M</th>
              <th>W</th>
              <th>J</th>
              <th>V</th>
            </tr>
          </thead>

          <tbody>
            {
                       modulos.map((dia, index) => {
                         if (index === 3) {
                           return (
                             <React.Fragment key="A">
                               <FilaAlmuerzo key="A" />
                               <FilaHorario key={index} dia={dia} index={index} />
                             </React.Fragment>
                           );
                         }
                         return (
                           <FilaHorario key={index} dia={dia} index={index} />
                         );
                       })
                   }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Horario;
