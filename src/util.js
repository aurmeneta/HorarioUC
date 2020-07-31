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

const distintoHorario = (grupo1, grupo2) => {
    return grupo1.horario.every(horario1 => {
        return grupo2.horario.every(horario2 => {
            return ((horario1.dia === horario2.dia && horario1.hora !== horario2.hora) || (horario1.dia !== horario2.dia));
        });
    });
}

const compatibles = (combinacion, grupo) => {
    return combinacion.every(g => distintoHorario(g, grupo));
}

const buscarSiglas = async (periodo, siglas) => {
    return await Promise.all(siglas.map(async sigla => await buscarSigla(periodo, sigla)))
}

const buscarSigla = async (periodo, _sigla) => {
    const seccionesSinVerificar = await buscaCursos.buscarSigla(periodo, _sigla);

    const seccionesSinOrdenar = seccionesSinVerificar.filter(seccion => seccion.sigla === _sigla);

    if (seccionesSinOrdenar.length === 0) return {sigla: _sigla, secciones: [], n_secciones: 0, nombre: "SIN RESULTADOS"}

    const secciones = seccionesSinOrdenar.sort( (s1, s2) => s1.seccion - s2.seccion);

    let { sigla, nombre } = secciones[0];
    let n_secciones = secciones.length;

    return {sigla, secciones, n_secciones, nombre}
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