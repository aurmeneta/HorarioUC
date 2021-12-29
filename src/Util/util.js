import { cursos } from "@aurmeneta/buscacursos-uc"

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

const URL_BUSCACURSOS = "https://buscacursos.aurmeneta.cl/"

/**
 * Busca una lista de siglas en buscaCursos para el semestre indicado.
 * @param periodo: semestre en el que se realiza la búsqueda.
 * @param string_siglas: siglas de los cursos a buscar.
 * @returns {Promise<Sigla[]>}
 */
const buscarSiglas = async (periodo, string_siglas) => {
    return await Promise.all(string_siglas.map(async string_sigla => await buscarSigla(periodo, string_sigla)))
}
/**
 * Busca la sigla indicada en el semestre indicado en buscaCursos.
 * @param periodo
 * @param string_sigla
 * @returns {Sigla}
 */
const buscarSigla = async (periodo, string_sigla) => {
    // Busca la sigla en buscaCursos.
    const seccionesSinVerificar = await cursos.buscarSigla(periodo, string_sigla, URL_BUSCACURSOS);

    // Comprueba que los resultados correspondan a cursos con la misma sigla que se está buscando.
    const secciones = seccionesSinVerificar.filter(seccion => seccion.sigla === string_sigla);

    // Si no hay resultados, retorna un objeto Sigla por defecto.
    if (secciones.length === 0) return new Sigla(string_sigla, "SIN RESULTADOS", [], 0);

    // Obtiene información de la sigla.
    let { sigla, nombre } = secciones[0];

    // Devuelve un objeto Sigla.
    return new Sigla(sigla, nombre, secciones);
}

// Generar combinaciones de cursos desde un array con los cursos agrupados por sigla y horario.
const generarCombinaciones = (siglasOriginales, choquesPermitidos) => {
    // Guarda una copia de las siglas a combinar.
    let siglas = [...siglasOriginales];
    // Obtiene la primera sigla.
    let sigla = siglas.shift();

    // Crea las primeras combinaciones, que corresponden a los grupos de cada sigla.
    // Cada combinación es un arreglo.
    let combinaciones = sigla.grupos.map(grupo => [grupo]);

    // Repetir hasta que no haya más siglas que combinar.
    while (siglas.length !== 0) {
        let nuevasCombinaciones = [];
        // Obtiene la siguiente sigla a combinar.
        sigla = siglas.shift();

        // Comprueba que cada combinación sea compatible con cada grupo de la sigla.
        combinaciones.forEach(combinacion => {
            // Repetir para cada grupo de la sigla
            sigla.grupos.forEach(grupo => {
                let compatibles = combinacion.every(grupo2 => cursos.Curso.horariosCompatibles(grupo, grupo2, choquesPermitidos))

                if (compatibles) {
                    // Copia la combinación.
                    let nuevaCombinacion = [...combinacion];
                    // Añade el nuevo grupo.
                    nuevaCombinacion.push(grupo);
                    // Guarda la combinación.
                    nuevasCombinaciones.push(nuevaCombinacion);
                }
            });
        });

        // Reescribir las combinaciones con las combinaciones que incluyen la nueva sigla.
        combinaciones = nuevasCombinaciones;
    }
    return combinaciones;
}

export { DIAS, NUMERO_MODULOS, HORA_MODULOS, buscarSigla, buscarSiglas, generarCombinaciones }