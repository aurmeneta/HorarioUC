const buscaCursos = require("buscacursos-uc");

import { Sigla } from './Sigla';

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
/**
 * Comprueba que dos cursos o grupos de cursos tengan el mismo horario.
 * @param curso1: objeto curso retornado por buscaCursos. Objeto grupo también es compatible.
 * @param curso2: objeto curso retornado por BuscaCursos. Objeto grupo también es compatible.
 * @returns {boolean}
 */
const mismoHorario = (curso1, curso2) => {
    // TODO: Comprobar que todos los horarios de curso2 estén en curso1.
    return curso1.horario.every(horario1 => {
        return curso2.horario.some(horario2 => {
            return horario1.tipo === horario2.tipo && horario1.dia === horario2.dia && horario1.hora === horario2.hora;
        });
    });
}

/**
 * Comprueba que dos cursos o grupo de cursos tengan horarios diferentes.
 * @param curso1: objeto curso retornado por buscaCursos. Objeto grupo también es compatible.
 * @param curso2: objeto curso retornado por buscaCursos. Objeto grupo también es compatible.
 * @returns {boolean}
 */
const distintoHorario = (curso1, curso2) => {
    const horario1 = curso1.horario;
    const horario2 = curso2.horario;

    // Comprobar que cada horario de horario1 no choque a algún horario de horario2.
    return horario1.every(horario1 => {
        return horario2.every(horario2 => {
            return (
                (horario1.dia === horario2.dia && horario1.hora !== horario2.hora) ||   // Horarios son el mismo día, pero en horas distintas.
                (horario1.dia !== horario2.dia)) ||   // Horarios son en dias distintos.
                (horario1.dia === 'SIN HORARIO') ||   // Horario1 no tiene horario.
                (horario2.dia === 'SIN HORARIO') // Horario2 no tiene horario.

        });
    });
}

/**
 * Comprueba que un grupo de cursos sea compatible con una combinación de grupos.
 * Es decir, que tenga horario distinto a cada grupo de la compinación.
 * @param combinacion
 * @param grupo
 * @returns {boolean}
 */
const compatibles = (combinacion, grupo) => {
    return combinacion.every(g => distintoHorario(g, grupo));
}

/**
 * Busca una lista de siglas en buscaCursos para el semestre indicado.
 * @param periodo: semestre en el que se realiza la búsqueda.
 * @param siglas: sigla de los cursos a buscar.
 * @returns {Promise<Sigla[]>}
 */
const buscarSiglas = async (periodo, siglas) => {
    return await Promise.all(siglas.map(async sigla => await buscarSigla(periodo, sigla)))
}
/**
 * Busca la sigla indicada en el semestre indicado en buscaCursos.
 * @param periodo
 * @param _sigla
 * @returns {Promise<Sigla>}
 */
const buscarSigla = async (periodo, _sigla) => {
    // Busca la sigla en buscaCursos.
    const seccionesSinVerificar = await buscaCursos.buscarSigla(periodo, _sigla);

    // Comprueba que los resultados correspondan a cursos con la misma sigla que se está buscando.
    const seccionesSinOrdenar = seccionesSinVerificar.filter(seccion => seccion.sigla === _sigla);

    // Si no hay resultados, retorna un objeto Sigla por defecto.
    if (seccionesSinOrdenar.length === 0) return new Sigla(_sigla, "SIN RESULTADOS", [], 0);

    // Ordena los cursos por número de sección. TODO: debería estar implementado en buscaCursos o en la clase Sigla.
    const secciones = seccionesSinOrdenar.sort( (s1, s2) => s1.seccion - s2.seccion);

    // Obtiene información
    let { sigla, nombre } = secciones[0];
    let n_secciones = secciones.length;

    return new Sigla(sigla, nombre, secciones, n_secciones);
}


// Agrupa secciones de una sigla que coincidan en sus horarios.
const agruparSiglaPorHorario = (siglaSinAgrupar) => {
    let { sigla, n_secciones, nombre, secciones } = siglaSinAgrupar;
    let seccionesSinAgrupar = [...secciones];
    let grupos = [];


    while(seccionesSinAgrupar.length !== 0){
        let seccion = seccionesSinAgrupar.shift();
        let { horario } = seccion;
        let secciones = [];

        seccionesSinAgrupar.forEach(seccion2 => {
            if (mismoHorario(seccion, seccion2)) {
                secciones.push(seccion2);
            }
        });

        secciones.forEach(seccion2 => seccionesSinAgrupar.splice(seccionesSinAgrupar.indexOf(seccion2), 1));
        secciones.push(seccion);

        grupos.push({
            sigla,
            nombre,
            secciones,
            horario,
            n_secciones: secciones.length});
    }

    return {sigla, grupos, n_secciones, nombre, secciones};
}

// Generar combinaciones de cursos desde un array con los cursos agrupados por sigla y horario.
const generarCombinaciones = (siglasAgrupadasPorHorario) => {
    // Obtener combinaciones compatibles.
    let siglasAgrupadas = [...siglasAgrupadasPorHorario];
    let siglaAgrupada = siglasAgrupadas.shift();
    let combinaciones = siglaAgrupada.grupos.map(grupo => [grupo]);

    while (siglasAgrupadas.length !== 0){
        let nuevasCombinaciones = [];
        siglaAgrupada = siglasAgrupadas.pop();

        combinaciones.forEach(combinacion => {
            siglaAgrupada.grupos.forEach(grupo => {
                if (compatibles(combinacion, grupo)) {
                    let nuevaCombinacion = [...combinacion];
                    nuevaCombinacion.push(grupo);
                    nuevasCombinaciones.push(nuevaCombinacion);
                }
            });
        });

        combinaciones = nuevasCombinaciones;
    }
    return combinaciones;
}

const filtrarSiglasSegunSelecciones = (siglasSinAgrupar, seccionesSeleccionadas) => {
    const siglasFiltradasSinAgrupar = [];

    siglasSinAgrupar.forEach(siglaSinAgrupar => {
        const { sigla } = siglaSinAgrupar;
        const seccionSeleccionada = seccionesSeleccionadas.find( (siglaSeleccionada) => siglaSeleccionada.sigla === sigla);

        if (seccionSeleccionada) {
            const { seccion } = seccionSeleccionada;

            if (seccion === 0) siglasFiltradasSinAgrupar.push(siglaSinAgrupar);
            else {
                const {nombre, secciones} = siglaSinAgrupar;
                const seccionesFiltradas = [secciones.find(s => s.seccion === seccion)];

                siglasFiltradasSinAgrupar.push({
                    nombre,
                    sigla,
                    n_secciones: seccionesFiltradas.length,
                    secciones: seccionesFiltradas
                });
            }

        } else {
            siglasFiltradasSinAgrupar.push(siglaSinAgrupar);
        }
    });

    return siglasFiltradasSinAgrupar;
}

export {DIAS, NUMERO_MODULOS, HORA_MODULOS, mismoHorario, distintoHorario, compatibles, buscarSigla, buscarSiglas, agruparSiglaPorHorario, generarCombinaciones, filtrarSiglasSegunSelecciones}