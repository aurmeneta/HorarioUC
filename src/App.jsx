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

import React from 'react';
import { Provider } from '@rollbar/react';
import Rollbar from 'rollbar';

import * as util from './util/util';
import * as storage from './util/storage';
import rollbarConfig from './util/rollbar-config';

import CursosCard from './components/Cards/CursosCard';
import BuscarCursoCard from './components/Cards/BuscarCursoCard';
import CombinacionesCard from './components/Cards/CombinacionesCard';
import ModalCupos from './components/ModalCupos';
import Layout from './components/Layout';

const rollbar = new Rollbar(rollbarConfig);

const choquesPermitidos = storage.cargarChoquesPermitidos();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stringSiglas: storage.siglasGuardadas(),
      periodo: storage.periodoSeleccionado(),
      siglas: [],
      combinaciones: [],
      seccionesSeleccionadas: {},
      cambios: true,
      buscando: false,
      errorEnBusqueda: undefined,
      cursoCupos: { nrc: '', sigla: '', nombre: '' },
      errorEnCombinaciones: false,
    };

    this.agregarSigla = this.agregarSigla.bind(this);
    this.buscarSiglas = this.buscarSiglas.bind(this);
    this.generarCombinaciones = this.generarCombinaciones.bind(this);
    this.borrarSigla = this.borrarSigla.bind(this);
    this.elegirSeccion = this.elegirSeccion.bind(this);
    this.actualizarStorage = this.actualizarStorage.bind(this);
    this.guardarCursoCupos = this.guardarCursoCupos.bind(this);
    this.elegirPeriodo = this.elegirPeriodo.bind(this);
  }

  componentDidMount() {
    this.buscarSiglas();
  }

  componentDidUpdate() {
    this.buscarSiglas();
    this.generarCombinaciones();
    this.actualizarStorage();
  }

  guardarCursoCupos(curso) {
    this.setState({ cursoCupos: curso });
  }

  actualizarStorage() {
    const { stringSiglas } = this.state;
    storage.guardarSiglas(stringSiglas);
  }

  borrarSigla(event, sigla) {
    event.preventDefault();

    try {
      // eslint-disable-next-line no-undef
      gtag('event', 'del_sigla', {
        event_category: 'siglas',
        event_label: 'borrar sigla',
        value: sigla.sigla,
      });
    } catch (e) {
      rollbar.warn(`Error al publicar analytics ${e.toString()}`);
    }

    // Eliminar la Sigla del array de siglas y strings de siglas.
    this.setState((prevState) => {
      const { siglas, stringSiglas } = prevState;
      // Busca los indexes de la sigla.
      const indexSiglas = siglas.indexOf(sigla);
      const indexString = stringSiglas.indexOf(sigla.sigla);

      // Elimina los elementos de los arreglos correspondientes.
      if (indexSiglas >= 0) siglas.splice(indexSiglas, 1);
      if (indexString >= 0) stringSiglas.splice(indexString, 1);

      return { siglas, cambios: true };
    });
  }

  agregarSigla(sigla) {
    this.setState((prevState) => {
      const { stringSiglas } = prevState;

      // Revisar que sigla no haya sido añadida anteriormente.
      if (!stringSiglas.includes(sigla)) {
        stringSiglas.push(sigla);

        try {
          // eslint-disable-next-line no-undef
          gtag('event', 'add_sigla', {
            event_category: 'siglas',
            event_label: 'añadir sigla',
            value: sigla,
          });
        } catch (e) {
          rollbar.warn(`Error al publicar analytics ${e.toString()}`);
        }
      }
      return { stringSiglas, cambios: true };
    });
  }

  buscarSiglas() {
    const {
      stringSiglas, siglas, buscando, periodo,
    } = this.state;

    // Si ya se está realizando una búsqueda, retornar para evitar duplicaciones y recursiones.
    if (buscando) return;

    // Revisar cuáles son las siglas sin objeto Sigla.
    const nuevosStringsSiglas = [];
    stringSiglas.forEach((stringSigla) => {
      // Buscar si la sigla tiene ya un objeto Sigla.
      const sigla = siglas.find((s) => s.sigla === stringSigla);
      if (!sigla) nuevosStringsSiglas.push(stringSigla);
    });

    // Si es que hay siglas nuevas, obtenerlas desde en BuscaCursos.
    if (nuevosStringsSiglas.length > 0) {
      // Levanta el flag de buscando para evitar búsquedas en simultáneo
      this.setState({ buscando: true, errorEnBusqueda: undefined });

      // Buscar las siglas en BuscaCursos
      util.buscarSiglas(periodo, nuevosStringsSiglas)
        .then((nuevasSiglas) => {
          this.setState((prevState) => {
            const { siglas: siglasAnteriores } = prevState;
            // Añade las Siglas encontrados al array.
            const siglasConcatenadas = siglasAnteriores.concat(nuevasSiglas);

            // Guarda las siglas, levanta el flag que indica que hubo cambios y
            // baja el flag de búsqueda.
            return { siglas: siglasConcatenadas, cambios: true, buscando: false };
          });
        })
        .catch((reason) => {
          // Si ocurre un error, elimina las siglas buscadas del array para evitar recurciones
          // y muestra la razón del error.
          rollbar.error(`Error al buscar nuevas siglas; ${reason}`);
          this.setState((prevState) => {
            const { stringSiglas: stringSiglasAnterior } = prevState;
            nuevosStringsSiglas.forEach(
              (stringSigla) => stringSiglasAnterior
                .splice(stringSiglasAnterior.indexOf(stringSigla), 1),
            );

            // Guarda las stringSiglas, baja el flag de búsqueda y guarda la razón del error.
            return { stringSiglas, buscando: false, errorEnBusqueda: reason.toString() };
          });
        });
    }
  }

  elegirPeriodo(periodo) {
    storage.guardarPeriodoSeleccionado(periodo);
    this.setState({
      periodo,
      siglas: [],
      seccionesSeleccionadas: {},
      cambios: true,
    });
  }

  generarCombinaciones() {
    const {
      siglas, seccionesSeleccionadas, cambios, buscando,
    } = this.state;

    // Si no hay cambios, hay una búsqueda en curso o no hay siglas, no generar las combinaciones.
    if (!cambios || buscando || siglas.length === 0) return;

    // Filtrar siglas según selecciones de sección del usuario.
    const siglasFiltradas = siglas.map((sigla) => {
      const seccionSeleccionada = seccionesSeleccionadas[sigla.sigla];
      const numerosSecciones = [];

      if (seccionSeleccionada) numerosSecciones.push(seccionSeleccionada);
      else numerosSecciones.push(0);

      return sigla.filtrarPorSecciones(numerosSecciones);
    });

    // Genera las combinaciones.
    let combinaciones = [];
    let errorEnCombinaciones = false;

    try {
      // TODO: mejorar cómo se manejan las ambigüedades.
      combinaciones = util.generarCombinaciones(siglasFiltradas, choquesPermitidos);
    } catch (e) {
      rollbar.error(`Error al generar combinaciones; ${e.toString()}`);
      errorEnCombinaciones = true;
    }

    // Guardar las combinaciones y bajar flag de cambios
    this.setState({ combinaciones, cambios: false, errorEnCombinaciones });
  }

  elegirSeccion(event) {
    event.preventDefault();
    const { name: sigla, value: seccion } = event.target;

    this.setState((prevState) => {
      const { seccionesSeleccionadas } = prevState;
      seccionesSeleccionadas[sigla] = parseInt(seccion, 10);

      return { seccionesSeleccionadas, cambios: true };
    });
  }

  render() {
    const {
      siglas, combinaciones, seccionesSeleccionadas, buscando, errorEnBusqueda, cursoCupos, periodo,
      errorEnCombinaciones,
    } = this.state;

    return (
      <React.StrictMode>
        <Provider instance={rollbar}>
          <Layout>
            <ModalCupos
              curso={cursoCupos}
              periodo={periodo}
            />

            <div className="alert alert-danger">
              La Universidad está bloqueando este servicio. Puede ser que haya intermitencias y no se muestren resultados de búsquedas. Alternativamente, <a href="https://ramosuc.cl/" target="_blanck" rel="noreferrer">RamosUC</a> está disponible.
            </div>

            <div className="alert alert-info">
              <b>Choques de módulos:</b>
              {' '}
              Si quieres permitir el choque de módulos, puedes configurar las reglas
              {' '}
              <a href="/choques.html">acá</a>
              .
              <br />
              Si tienes algún comentario o encuentras algún error, déjalo
              {' '}
              <a href="https://forms.gle/f4BrPiT7si46yzEA9" target="_blank" rel="noreferrer">acá</a>
              .
            </div>

            <div className="row">
              <CursosCard
                siglas={siglas}
                combinaciones={combinaciones}
                borrarSigla={this.borrarSigla}
                seccionesSeleccionadas={seccionesSeleccionadas}
                elegirSeccion={this.elegirSeccion}
              />

              <BuscarCursoCard
                agregarSigla={this.agregarSigla}
                buscando={buscando}
                errorEnBusqueda={errorEnBusqueda}
                periodo={periodo}
                elegirPeriodo={this.elegirPeriodo}
              />
            </div>

            <div className="row">
              <CombinacionesCard
                combinaciones={combinaciones}
                guardarCursoCupos={this.guardarCursoCupos}
                semestre={periodo}
                errorEnCombinaciones={errorEnCombinaciones}
              />
            </div>
          </Layout>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default App;
