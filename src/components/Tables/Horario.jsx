import React from 'react';
import { DIAS, NUMERO_MODULOS } from '../../util';
import {FilaHorario, FilaAlmuerzo} from "./FilasHorario";

class Horario extends React.Component {
    render(){
        let {combinacion} = this.props;
        if (!combinacion) return;

        let modulos = [];

        for (let i = 0; i < NUMERO_MODULOS; i++){
            let dias = [];
            for (let j = 0; j < DIAS.length; j++) {
                dias.push({
                    tipo: "",
                    secciones: [],
                    sigla: ""
                    });
            }
            modulos.push(dias);
        }

        combinacion.forEach(grupo => {
            const { sigla } = grupo;

            let secciones = grupo.secciones.map(curso => curso.seccion);
            secciones.sort( (a, b) => a - b );

            grupo.horario.forEach(horario => {
                let dia = DIAS.indexOf(horario.dia);
                let { hora } = horario;
                let { tipo } = horario;

                modulos[hora - 1][dia] = {sigla, tipo, secciones};
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
                           if (index === 3) return (
                               <React.Fragment key={"A"}>
                                   <FilaAlmuerzo key={"A"}/>
                                   <FilaHorario key={index} dia={dia} index={index}/>
                               </React.Fragment>)
                           else return (
                               <FilaHorario key={index} dia={dia} index={index}/>
                           )
                       })
                   }
                   </tbody>
                </table>
           </div>)
    }
}

export default Horario;