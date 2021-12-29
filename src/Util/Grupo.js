class Grupo {
  constructor(sigla, nombre, secciones, horario) {
    this.sigla = sigla;
    this.horario = horario;
    this.nombre = nombre;
    this.secciones = secciones;
    this.n_secciones = secciones.length;
  }
}

export default Grupo;
