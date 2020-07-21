const buscaCursos = require("buscacursos-uc");

const DIAS = [
    "L",
    "M",
    "W",
    "J",
    "V"];

const NUMERO_MODULOS = 8;

const HORA_MODULOS = [
    "08:30",
    "10:30",
    "11:30",
    "14:00",
    "15:30",
    "17:00",
    "18:30",
    "20:00",
]

const mismoHorario = (curso1, curso2) => {
    return curso1.horario.every(horario1 => {
        return curso2.horario.some(horario2 => {
            return horario1.tipo === horario2.tipo && horario1.dia === horario2.dia && horario1.hora === horario2.hora;
        });
    });
}

const distintoHorario = (curso1, curso2) => {
    return curso1.horario.every(horario1 => {
        return curso2.horario.every(horario2 => {
            return ((horario1.dia === horario2.dia && horario1.hora !== horario2.hora) || (horario1.dia !== horario2.dia));
        });
    });
}

const compatibles = (combinacion, secciones2) => {
    return combinacion.every(secciones1 => this.distintoHorario(secciones1[0], secciones2[0]));
}

const buscarSiglas = async (periodo, siglas) => {
    return await Promise.all(siglas.map(async sigla => await buscarSigla(periodo, sigla)))
}

const buscarSigla = async (periodo, _sigla) => {
    let secciones = await buscaCursos.buscarSigla(periodo, _sigla);
    let { sigla, nombre } = secciones[0];
    let n_secciones = secciones.length;

    return {sigla, secciones, n_secciones, nombre}
}


// Agrupa secciones de una sigla que coincidan en sus horarios.
const agruparSiglaPorHorario = (siglaSinAgrupar) => {
    let { secciones, sigla, n_secciones, nombre } = siglaSinAgrupar;
    let grupos = [];


    while(secciones.length !== 0){
        let seccion = secciones.pop();
        let grupo = [];

        secciones.forEach(seccion2 => {
            if (mismoHorario(seccion, seccion2)) {
                grupo.push(seccion2);
            }
        });

        grupo.forEach(seccion2 => secciones.splice(secciones.indexOf(seccion2), 1));
        grupo.push(seccion);

        grupos.push(grupo);
    }

    return {sigla, grupos, n_secciones, nombre};
}

// Generar combinaciones de cursos desde un array con los cursos agrupados por sigla y horario.
const generarCombinaciones = (siglasAgrupadasPorHorario) => {
    // Obtener combinaciones compatibles.
    let combinaciones = siglasAgrupadasPorHorario.pop().map(sigla1 => [sigla1]);

    while (siglasAgrupadasPorHorario.length !== 0){
        let nuevasCombinaciones = [];
        let sigla = siglasAgrupadasPorHorario.pop();

        combinaciones.forEach(combinacion => {
            sigla.forEach(secciones2 => {
                if (this.compatibles(combinacion, secciones2)) {
                    let nuevaCombinacion = [...combinacion];
                    nuevaCombinacion.push(secciones2);
                    nuevasCombinaciones.push(nuevaCombinacion);
                }
            });
        });

        combinaciones = nuevasCombinaciones;
    }
    return combinaciones;
}

export {DIAS, NUMERO_MODULOS, HORA_MODULOS, mismoHorario, distintoHorario, compatibles, buscarSigla, buscarSiglas, agruparSiglaPorHorario, generarCombinaciones}