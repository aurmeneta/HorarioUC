class Sigla {
    constructor(sigla, nombre, secciones, n_secciones) {
        this.sigla = sigla;
        this.nombre = nombre;
        this.secciones = secciones.sort( (a ,b) => a.seccion - b.seccion);
        this.n_secciones = n_secciones;
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

    get grupos() {
        return this.agruparPorHorario();
    }

    agruparPorHorario() {
        let secciones = [...this.secciones];
        let grupos = [];

        while(secciones.length > 0) {
            let seccion = secciones.shift();
            let { horario } = seccion;

            // Arreglo para guardar secciones con el mismo horario.
            let grupo = [];

            //secciones
        }

        return grupos
    }
}

class Grupo extends Sigla {
    constructor(sigla, nombre, secciones, n_secciones, horario) {
        super(sigla, nombre, secciones, n_secciones);
        this.horario = horario;
    }
}

export { Sigla };