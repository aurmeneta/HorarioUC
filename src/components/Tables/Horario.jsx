/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { DIAS, NUMERO_MODULOS } from '../../util/util';
import { FilaHorario, FilaAlmuerzo } from './FilasHorario';
import Grupo from '../../util/Grupo';

function Horario(props) {
  const { combinacion } = props;
  if (!combinacion) return (<p>¡No hay combinación!</p>);

  // TODO: permitir choque de horarios.
  // Inicializa un array de dos dimensiones para almacenar los cursos
  // correspondientes a cada módulo.
  // La primera dimensión corresponde a los modulos y la segunda a los días.
  const modulos = [];

  for (let i = 0; i < NUMERO_MODULOS; i += 1) {
    const dias = [];
    for (let j = 0; j < DIAS.length; j += 1) {
      // Añade un arreglo vacío.
      dias.push([]);
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

      modulos[hora - 1][dia].push({ sigla, tipo, secciones: numerosSecciones });
    });
  });

  return (
    <div className="col-lg table-responsive">
      <table className="table table-bordered table-sm text-center table-hover" id="horario" style={{ '--bs-border-opacity': 0.5 }}>
        <thead>
          <tr>
            <th>Módulo</th>
            <th>L</th>
            <th>M</th>
            <th>W</th>
            <th>J</th>
            <th>V</th>
            <th>S</th>
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

Horario.propTypes = {
  combinacion: PropTypes.arrayOf(PropTypes.instanceOf(Grupo)).isRequired,
};

export default Horario;
