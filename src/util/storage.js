import { cursos } from '@aurmeneta/buscacursos-uc';
import { URL_BUSCACURSOS } from './util';

const storage = window.localStorage;

function periodosDisponibles() {
  const periodos = storage.getItem('periodos');

  if (periodos) {
    return periodos.split(',');
  }
  return ['2022-1'];
}

async function actualizarPeriodosDisponibles() {
  const periodosNuevos = await cursos.obtenerPeriodos(URL_BUSCACURSOS);
  storage.setItem('periodos', periodosNuevos.toString());
}

function periodoSeleccionado() {
  return storage.getItem('periodo_seleccionado') || '2022-1';
}

function guardarPeriodoSeleccionado(periodo) {
  storage.setItem('periodo_seleccionado', periodo);
}

function siglasGuardadas() {
  const siglas = storage.getItem('siglas_guardadas');

  if (siglas) {
    return siglas.split(',');
  }

  return ['IIC1103', 'MAT1620'];
}

function guardarSiglas(siglas) {
  storage.setItem('siglas_guardadas', siglas.toString());
}

export {
  periodosDisponibles, actualizarPeriodosDisponibles, periodoSeleccionado,
  guardarPeriodoSeleccionado, siglasGuardadas, guardarSiglas,
};
