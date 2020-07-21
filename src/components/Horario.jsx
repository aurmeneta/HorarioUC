import React from 'react';
import { DIAS, NUMERO_MODULOS } from '../util';
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

        combinacion.forEach(siglaAgrupada => {
            let curso = siglaAgrupada[0];

            let secciones = siglaAgrupada.map(seccion => seccion.seccion);
            secciones.sort( (a, b) => a - b );

            curso.horario.forEach(horario => {
                let dia = DIAS.indexOf(horario.dia);
                let { hora } = horario;
                let { sigla } = curso;
                let { tipo } = horario;


                modulos[hora - 1][dia] = {sigla, tipo, secciones};
            });
        });

       return (
           <table className="table table-bordered table-sm text-center">
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
        </table>)
    }
}

export default Horario;