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

import { cursos } from '@aurmeneta/buscacursos-uc';
import Grupo from './Grupo';

class Sigla {
  constructor(sigla, nombre, secciones) {
    this.sigla = sigla;
    this.nombre = nombre;
    this.secciones = secciones.sort((a, b) => a.seccion - b.seccion);
    this.n_secciones = secciones.length;
    this.grupos = this.agruparPorHorario();
  }

  /**
     * Filtra las secciones de las siglas y retorna una nueva instancia de Sigla con los resultados
     * @param numerosSecciones
     * @returns {Sigla}
     */
  filtrarPorSecciones(numerosSecciones) {
    const seccionesFiltradas = this.secciones
      .filter((seccion) => numerosSecciones
        .some((numeroSeccion) => numeroSeccion === seccion.seccion || numeroSeccion === 0));

    return new Sigla(this.sigla, this.nombre, seccionesFiltradas, seccionesFiltradas.length);
  }

  agruparPorHorario() {
    const secciones = [...this.secciones];
    const grupos = [];

    while (secciones.length > 0) {
      const seccion = secciones.shift();
      const { horario } = seccion;

      // Arreglo para guardar secciones con el mismo horario.
      let seccionesGrupo = [];

      // Busca las secciones que tengan el mismo horario.
      seccionesGrupo = secciones.filter((seccion2) => cursos.Curso.mismoHorario(seccion, seccion2));

      // Elimina las secciones del array original para no duplicar grupos.
      seccionesGrupo.forEach((seccionGrupo) => secciones
        .splice(secciones.indexOf(seccionGrupo), 1));

      seccionesGrupo.unshift(seccion);
      // secciones
      grupos.push(new Grupo(seccion.sigla, seccion.nombre, seccionesGrupo, horario));
    }
    return grupos;
  }
}

export default Sigla;
