/*
Copyright (c) 2022, Andrés Urmeneta B. <aurmeneta@uc.cl>
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

import { cursos, cupos } from '@aurmeneta/buscacursos-uc';

import Sigla from './Sigla';

const DIAS = [
  'L',
  'M',
  'W',
  'J',
  'V',
  'S'];

const TIPO_SEMESTRES = {
  '2022-1': '1',
  '2022-2': '1',
  '2022-3': '1',
  '2023-1': '1',
};

const TIPO_SEMESTRE_DEFAULT = '2';

const HORA_MODULOS = {
  1: [
    '08:30',
    '10:00',
    '11:30',
    '14:00',
    '15:30',
    '17:00',
    '18:30',
    '20:00'],
  2: [
    '08:20',
    '09:40',
    '11:00',
    '12:20',
    '14:50',
    '16:10',
    '17:30',
    '18:50',
    '20:10'],
};

const MODULO_ANTES_DE_ALMUERZO = {
  1: 3,
  2: 4,
};

const NUMERO_MODULOS = {
  1: HORA_MODULOS['1'].length,
  2: HORA_MODULOS['2'].length,
};

const URL_BUSCACURSOS = 'https://buscacursos.aurmeneta.cl/';
const URL_CUPOS = 'https://buscacursos.aurmeneta.cl/informacionVacReserva.ajax.php';

/**
 * Busca la sigla indicada en el semestre indicado en buscaCursos.
 * @param periodo
 * @param string_sigla
 * @returns {Sigla}
 */
const buscarSigla = async (periodo, stringSigla) => {
  const seccionesSinVerificar = await cursos.buscarSigla(periodo, stringSigla, URL_BUSCACURSOS);
  const secciones = seccionesSinVerificar.filter((seccion) => seccion.sigla === stringSigla);

  if (secciones.length === 0) return new Sigla(stringSigla, 'SIN RESULTADOS', [], 0);

  const { sigla, nombre } = secciones[0];
  return new Sigla(sigla, nombre, secciones);
};

/**
 * Busca una lista de siglas en buscaCursos para el semestre indicado.
 * @param periodo: semestre en el que se realiza la búsqueda.
 * @param string_siglas: siglas de los cursos a buscar.
 * @returns {Promise<Sigla[]>}
 */
const buscarSiglas = (periodo, stringSiglas) => Promise
  .all(stringSiglas.map((stringSigla) => buscarSigla(periodo, stringSigla)));

// Generar combinaciones de cursos desde un array con los cursos agrupados por sigla y horario.
const generarCombinaciones = (siglasOriginales, choquesPermitidos) => {
  const siglas = [...siglasOriginales];
  const primeraSigla = siglas.shift();

  let combinaciones = primeraSigla.grupos.map((grupo) => [grupo]);

  // Backtracking para generar todas las combinaciones posibles.
  while (siglas.length !== 0) {
    const nuevasCombinaciones = [];
    const sigla = siglas.shift();

    // Comprueba que cada combinación sea compatible con cada grupo de la sigla.
    combinaciones.forEach((combinacion) => {
      sigla.grupos.forEach((grupo) => {
        const compatibles = combinacion.every((grupo2) => cursos.Curso
          .horariosCompatibles(grupo, grupo2, choquesPermitidos));

        if (compatibles) {
          const nuevaCombinacion = [...combinacion];
          nuevaCombinacion.push(grupo);
          nuevasCombinaciones.push(nuevaCombinacion);
        }
      });
    });

    combinaciones = nuevasCombinaciones;
  }
  return combinaciones;
};

/**
 * Obtener los cupos disponibles de un curso desagregados por escuela.
 * @param periodo: período en el que se rinde el curso
 * @param nrc: nrc del curso
 * @returns {}
 */
const obtenerCupos = (periodo, nrc) => cupos.obtenerCupos(periodo, nrc, URL_CUPOS, URL_BUSCACURSOS);

export {
  DIAS, NUMERO_MODULOS, HORA_MODULOS, buscarSigla, buscarSiglas, generarCombinaciones,
  obtenerCupos, URL_BUSCACURSOS, URL_CUPOS, MODULO_ANTES_DE_ALMUERZO, TIPO_SEMESTRES,
  TIPO_SEMESTRE_DEFAULT,
};
