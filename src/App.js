/*
Copyright (c) 2020, Andrés Urmeneta B. <aurmeneta@uc.cl>
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

import * as util from "./Util/util";

import Navbar from "./components/Navbar";
import CursosCard from "./components/Cards/CursosCard";
import BuscarCursoCard from "./components/Cards/BuscarCursoCard";
import CombinacionesCard from "./components/Cards/CombinacionesCard";
import ChoquesCard from "./components/Cards/ChoquesCard"
import ErrorBoundary from "./components/ErrorBoundary";
import { ChoquesPermitidos } from 'buscacursos-uc';
import Cookies from 'js-cookie';

const periodo = "2021-2";
const cookieName = "siglas"
let siglasDefault = [
    "EYP1113",
    "FIS1533"
]


class App extends React.Component {
    constructor(props) {
        super(props);

        let saved = Cookies.get(cookieName)

        if (saved) {
            siglasDefault = saved.split(",")
        }

        this.state = {
            string_siglas: siglasDefault,
            siglas: [],
            combinaciones: [],
            seccionesSeleccionadas: [],
            cambios: true,
            buscando: false,
            errorEnBusqueda: undefined,
            choquesPermitidos: new ChoquesPermitidos()
        }

        this.agregarSigla = this.agregarSigla.bind(this);
        this.buscarSiglas = this.buscarSiglas.bind(this);
        this.generarCombinaciones = this.generarCombinaciones.bind(this);
        this.borrarSigla = this.borrarSigla.bind(this);
        this.elegirSeccion = this.elegirSeccion.bind(this);
        this.updateCookie = this.updateCookie.bind(this);
    }

    updateCookie() {
        let val = this.state.string_siglas.join(",")
        Cookies.set(cookieName, val, {expires: 30})
    }

    borrarSigla(event, sigla) {
        event.preventDefault();
        
        try {
            gtag('event', 'del_sigla', {
                'event_category': 'siglas',
                'event_label': 'borrar sigla',
                'value': sigla.sigla
            })
        } catch (e) {
            console.error(e)
        }
        

        // Eliminar la Sigla del array de siglas y strings de siglas.
        this.setState((prevState) => {
            let { siglas, string_siglas } = prevState;
            // Busca los indexes de la sigla.
            const indexSiglas = siglas.indexOf(sigla);
            const indexString = string_siglas.indexOf(sigla.sigla)

            // Elimina los elementos de los arreglos correspondientes.
            if (indexSiglas >= 0) siglas.splice(indexSiglas, 1)
            if (indexString >= 0) string_siglas.splice(indexString, 1)

            return {siglas, cambios: true};
        });
    }

    agregarSigla(sigla) {
        this.setState(prevState => {
            let { string_siglas } = prevState;

            // Revisar que sigla no haya sido añadida anteriormente.
            if ( !string_siglas.includes(sigla) ) {
                string_siglas.push(sigla);

                try {
                    gtag('event', 'add_sigla', {
                        'event_category': 'siglas',
                        'event_label': 'añadir sigla',
                        'value': sigla
                    })
                } catch (e) {
                    console.error(e)
                }
                
            } 
            return { string_siglas, cambios: true };
        });
    }

    buscarSiglas() {
        const { string_siglas, siglas, buscando } = this.state;

        // Si ya se está realizando una búsqueda, retornar para evitar duplicaciones y recursiones.
        if (buscando) return;

        // Revisar cuáles son las siglas sin objeto Sigla.
        const nuevasSiglas = [];
        string_siglas.forEach(string_sigla => {
            // Buscar si la sigla tiene ya un objeto Sigla.
            const sigla = siglas.find(s => s.sigla === string_sigla);
            if (!sigla) nuevasSiglas.push(string_sigla);
        });

        // Si es que hay siglas nuevas, obtenerlas desde en BuscaCursos.
        if (nuevasSiglas.length > 0) {
            // Levanta el flag de buscando para evitar búsquedas en simultáneo
            this.setState({buscando: true, errorEnBusqueda: undefined});

            // Buscar las siglas en BuscaCursos
            util.buscarSiglas(periodo, nuevasSiglas)
                .then(nuevasSiglas => {
                    this.setState((prevState) => {
                        let { siglas } = prevState;
                        // Añade las Siglas encontrados al array.
                        siglas = siglas.concat(nuevasSiglas);

                        // Guarda las siglas, levanta el flag que indica que hubo cambios y baja el flag de búsqueda.
                        return { siglas, cambios: true, buscando: false};
                    });
                })
                .catch(reason => {
                    // Si ocurre un error, elimina las siglas buscadas del array para evitar recurciones y muestra la razón del error.
                    console.error(reason)
                    this.setState( (prevState) => {
                        let { string_siglas } = prevState;
                        nuevasSiglas.forEach( (string_sigla) => string_siglas.splice(string_siglas.indexOf(string_sigla), 1));

                        // Guarda las string_siglas, baja el flag de búsqueda y guarda la razón del error.
                        return {string_siglas, buscando: false, errorEnBusqueda: reason.toString()}
                    });
                });
        }
    }

    generarCombinaciones() {
        let {siglas, seccionesSeleccionadas, cambios, buscando, choquesPermitidos} = this.state;

        // Si no hay cambios, hay una búsqueda en curso o no hay siglas, no generar las combinaciones.
        if (!cambios || buscando || siglas.length == 0) return;

        // Filtrar siglas según selecciones de sección del usuario.
        let siglasFiltradas = siglas.map(sigla => {
            const seccionSeleccionada = seccionesSeleccionadas.find(seccion => seccion.sigla === sigla.sigla)
            let numerosSecciones = []
            
            if (seccionSeleccionada) numerosSecciones.push(seccionSeleccionada.seccion)
            else numerosSecciones.push(0)

            return sigla.filtrarPorSecciones(numerosSecciones)
        })

        // Genera las combinaciones.
        let combinaciones = util.generarCombinaciones(siglasFiltradas, choquesPermitidos);

        // Guardar las combinaciones y bajar flag de cambios
        this.setState({combinaciones, cambios: false})
    }

    elegirSeccion(event) {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState( (prevState) => {
            let { seccionesSeleccionadas } = prevState;
            const seccionSeleccionada = {sigla: name, seccion: parseInt(value)};

            let indexSeccionSeleccionada = seccionesSeleccionadas.findIndex(seccion => seccion.sigla === name);

            if (indexSeccionSeleccionada === -1) seccionesSeleccionadas.push(seccionSeleccionada);
            else seccionesSeleccionadas[indexSeccionSeleccionada] = seccionSeleccionada;

            return { seccionesSeleccionadas, cambios: true };
        });

    }

    componentDidUpdate() {
        this.buscarSiglas();
        this.generarCombinaciones();
        this.updateCookie();
    }

    componentDidMount() {
        this.buscarSiglas();
    }

    render() {
        const { siglas, combinaciones, seccionesSeleccionadas, buscando, errorEnBusqueda } = this.state;

        return (
            <div>
                <Navbar/>

                <div className="row">
                    <CursosCard
                        siglas={siglas}
                        combinaciones={combinaciones}
                        borrarSigla={this.borrarSigla}
                        seccionesSeleccionadas={seccionesSeleccionadas}
                        elegirSeccion={this.elegirSeccion}/>
                    
                    <BuscarCursoCard agregarSigla={this.agregarSigla} buscando={buscando} errorEnBusqueda={errorEnBusqueda}/>
                </div>

                {/*
                <div className="row">
                    <ChoquesCard />
                </div>
                */}

                <div className="row">
                    <CombinacionesCard combinaciones={combinaciones}/>
                </div>

            </div>
        );
    }
}

export default hot(module)(App);
