/*
Copyright (c) 2021, Andrés Urmeneta B. <aurmeneta@uc.cl>
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
import { hot } from 'react-hot-loader';
import { Provider } from '@rollbar/react';
import Rollbar from 'rollbar';

import { ChoquesPermitidos } from '@aurmeneta/buscacursos-uc';
import Cookies from 'js-cookie';
import * as util from './Util/util';
import rollbarConfig from './Util/rollbar-config';

import Navbar from './components/Navbar';
import CursosCard from './components/Cards/CursosCard';
import BuscarCursoCard from './components/Cards/BuscarCursoCard';
import CombinacionesCard from './components/Cards/CombinacionesCard';
// import ChoquesCard from './components/Cards/ChoquesCard';
import ModalCupos from './components/ModalCupos';
import Footer from './components/Footer';

const rollbar = new Rollbar(rollbarConfig);

const periodo = '2022-1';
const cookieName = 'siglas';
let siglasDefault = [
  'ING2030',
];

class App extends React.Component {
  constructor(props) {
    super(props);

    const saved = Cookies.get(cookieName);

    if (saved) {
      siglasDefault = saved.split(',');
    }

    const choquesPertidos = new ChoquesPermitidos();
    // choquesPertidos.anadirChoque('*', 'AYU', '*', '*', true);

    this.state = {
      stringSiglas: siglasDefault,
      siglas: [],
      combinaciones: [],
      seccionesSeleccionadas: [],
      cambios: true,
      buscando: false,
      errorEnBusqueda: undefined,
      choquesPermitidos: choquesPertidos,
      cursoCupos: { nrc: '', sigla: '', nombre: '' },
    };

    this.agregarSigla = this.agregarSigla.bind(this);
    this.buscarSiglas = this.buscarSiglas.bind(this);
    this.generarCombinaciones = this.generarCombinaciones.bind(this);
    this.borrarSigla = this.borrarSigla.bind(this);
    this.elegirSeccion = this.elegirSeccion.bind(this);
    this.updateCookie = this.updateCookie.bind(this);
    this.guardarCursoCupos = this.guardarCursoCupos.bind(this);
  }

  componentDidMount() {
    this.buscarSiglas();
  }

  componentDidUpdate() {
    this.buscarSiglas();
    this.generarCombinaciones();
    this.updateCookie();
  }

  guardarCursoCupos(curso) {
    this.setState({ cursoCupos: curso });
  }

  updateCookie() {
    const { stringSiglas } = this.state;
    const val = stringSiglas.join(',');
    Cookies.set(cookieName, val, { expires: 30 });
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
    const { stringSiglas, siglas, buscando } = this.state;

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
          rollbar.error(`Error al buscar nievas siglas; ${reason}`);
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

  generarCombinaciones() {
    const {
      siglas, seccionesSeleccionadas, cambios, buscando, choquesPermitidos,
    } = this.state;

    // Si no hay cambios, hay una búsqueda en curso o no hay siglas, no generar las combinaciones.
    if (!cambios || buscando || siglas.length === 0) return;

    // Filtrar siglas según selecciones de sección del usuario.
    const siglasFiltradas = siglas.map((sigla) => {
      const seccionSeleccionada = seccionesSeleccionadas.find(
        (seccion) => seccion.sigla === sigla.sigla,
      );
      const numerosSecciones = [];

      if (seccionSeleccionada) numerosSecciones.push(seccionSeleccionada.seccion);
      else numerosSecciones.push(0);

      return sigla.filtrarPorSecciones(numerosSecciones);
    });

    // Genera las combinaciones.
    const combinaciones = util.generarCombinaciones(siglasFiltradas, choquesPermitidos);

    // Guardar las combinaciones y bajar flag de cambios
    this.setState({ combinaciones, cambios: false });
  }

  elegirSeccion(event) {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState((prevState) => {
      const { seccionesSeleccionadas } = prevState;
      const seccionSeleccionada = { sigla: name, seccion: parseInt(value, 10) };

      const indexSeccionSeleccionada = seccionesSeleccionadas
        .findIndex((seccion) => seccion.sigla === name);

      if (indexSeccionSeleccionada === -1) seccionesSeleccionadas.push(seccionSeleccionada);
      else seccionesSeleccionadas[indexSeccionSeleccionada] = seccionSeleccionada;

      return { seccionesSeleccionadas, cambios: true };
    });
  }

  render() {
    const {
      siglas, combinaciones, seccionesSeleccionadas, buscando, errorEnBusqueda, cursoCupos,
    } = this.state;

    return (
      <Provider instance={rollbar}>
        <div>
          <Navbar />
          <div className="container-fluid">
            <ModalCupos
              curso={cursoCupos}
              periodo={periodo}
            />
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
              />
            </div>

            {/*
                      <div className="row">
                          <ChoquesCard />
                      </div>
                      */}

            <div className="row">
              <CombinacionesCard
                combinaciones={combinaciones}
                guardarCursoCupos={this.guardarCursoCupos}
              />
            </div>
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App);
