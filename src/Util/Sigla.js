import { cursos } from "@aurmeneta/buscacursos-uc";

class Sigla {
    constructor(sigla, nombre, secciones) {
        this.sigla = sigla;
        this.nombre = nombre;
        this.secciones = secciones.sort((a, b) => a.seccion - b.seccion);
        this.n_secciones = secciones.length;
        this.grupos = this.agruparPorHorario()
    }

    /**
     * Filtra las secciones de las siglas y retorna una nueva instancia de Sigla con los resultados
     * @param numerosSecciones
     * @returns {Sigla}
     */
    filtrarPorSecciones(numerosSecciones) {
        let seccionesFiltradas = this.secciones.filter(seccion => {
            return numerosSecciones.some(numeroSeccion => numeroSeccion === seccion.seccion || numeroSeccion === 0);
        });

        return new Sigla(this.sigla, this.nombre, seccionesFiltradas, seccionesFiltradas.length);
    }

    agruparPorHorario() {
        let secciones = [...this.secciones];
        let grupos = [];

        while (secciones.length > 0) {
            let seccion = secciones.shift();
            let { horario } = seccion;

            // Arreglo para guardar secciones con el mismo horario.
            let secciones_grupo = [];

            // Busca las secciones que tengan el mismo horario.
            secciones_grupo = secciones.filter(seccion2 => cursos.Curso.mismoHorario(seccion, seccion2));

            // Elimina las secciones del array original para no duplicar grupos.
            secciones_grupo.forEach(seccion_grupo => secciones.splice(secciones.indexOf(seccion_grupo), 1));

            secciones_grupo.unshift(seccion);
            //secciones
            grupos.push(new Grupo(seccion.sigla, seccion.nombre, secciones_grupo, horario));
        }
        return grupos
    }
}

class Grupo {
    constructor(sigla, nombre, secciones, horario) {
        this.sigla = sigla
        this.horario = horario;
        this.nombre = nombre
        this.secciones = secciones
        this.n_secciones = secciones.length
    }
}

export { Sigla };
export default Sigla