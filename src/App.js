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
import ErrorBoundary from "./components/ErrorBoundary";

const periodo = "2020-2";
const siglasDefault = [
    "MAT1620",
    "LET0003",
    "FIS1514",
    "ICS1513",
    "IIC1103"]


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siglas: siglasDefault,
            siglasSinAgrupar: [],
            siglasAgrupadasSinFiltrar: [],
            combinaciones: [],
            seccionesSeleccionadas: [],
            seccionesAgrupadasFiltradas: [],
            cambios: true,
            buscando: false,
            errorEnBusqueda: undefined
        }

        this.agregarSigla = this.agregarSigla.bind(this);
        this.buscarSiglas = this.buscarSiglas.bind(this);
        this.agruparSiglas = this.agruparSiglas.bind(this);
        this.generarCombinaciones = this.generarCombinaciones.bind(this);
        this.borrarSigla = this.borrarSigla.bind(this);
        this.elegirSeccion = this.elegirSeccion.bind(this);
    }

    borrarSigla(event, sigla) {
        event.preventDefault();

        this.setState((prevState) => {
            let { siglas, siglasAgrupadas, siglasSinAgrupar } = prevState;
            const indexSiglas = siglas.indexOf(sigla);
            const indexSiglasSinAgrupar = siglasSinAgrupar.findIndex(siglaSinAgrupar => siglaSinAgrupar.sigla === sigla);

            if (indexSiglas >= 0) siglas.splice(indexSiglas, 1);
            if (indexSiglasSinAgrupar >= 0) siglasSinAgrupar.splice(indexSiglasSinAgrupar, 1);



            return {siglas, siglasSinAgrupar, cambios: true};
        });
    }

    agregarSigla(sigla) {
        this.setState(prevState => {
            let { siglas } = prevState;

            // Revisar que sigla no haya sido añadida anteriormente.
            if ( !siglas.includes(sigla) ) siglas.push(sigla);
            return { siglas, cambios: true };
        });
    }

    buscarSiglas() {
        const { siglas, siglasSinAgrupar, buscando } = this.state;

        // Si ya se está realizando una búsqueda, retornar para evitar duplicaciones.
        if (buscando) return;

        // Buscar siglas añadidas.
        const nuevasSiglas = [];
        siglas.forEach(sigla => {
            const siglaSinAgrupar = siglasSinAgrupar.find(siglaSinAgrupar => siglaSinAgrupar.sigla === sigla);
            if (!siglaSinAgrupar) nuevasSiglas.push(sigla);
        });

        // Si es que hay siglas nuevas, obtenerlas desde en BuscaCursos.
        if (nuevasSiglas.length > 0) {
            this.setState({buscando: true, errorEnBusqueda:undefined});

            util.buscarSiglas(periodo, nuevasSiglas)
                .then(nuevasSiglasSinAgrupar => {
                    this.setState((prevState) => {
                        let { siglasSinAgrupar } = prevState;
                        // Añade los cursos encontrados al array de las siglas sin agrupar.
                        siglasSinAgrupar = siglasSinAgrupar.concat(nuevasSiglasSinAgrupar);
                        return { siglasSinAgrupar, cambios: true, buscando: false};
                    });
                })
                .catch(reason => {
                    // Si ocurre un error, elimina las siglas buscadas del array para evitar recurciones y muestra la razón del error.
                    this.setState( (prevState) => {
                        let { siglas } = prevState;
                        nuevasSiglas.forEach( (sigla) => siglas.splice(siglas.indexOf(sigla), 1));
                        return {siglas, buscando: false, errorEnBusqueda: reason.toString()}
                    });
                });
        } else {
            // Si es que no hay siglas nuevas, agrupa las existentes y genera las combinaciones.
            this.agruparSiglas();
        }
    }

    agruparSiglas() {
        let { cambios } = this.state;

        if (!cambios) return;

        let { siglasSinAgrupar, seccionesSeleccionadas } = this.state;

        const siglasAgrupadasSinFiltrar = siglasSinAgrupar.map(siglaSinAgrupar => util.agruparSiglaPorHorario(siglaSinAgrupar));
        const siglasFiltradasSinAgrupar = util.filtrarSiglasSegunSelecciones(siglasSinAgrupar, seccionesSeleccionadas);

        const siglasAgrupadasFiltradas = siglasFiltradasSinAgrupar.map(siglaSinAgrupar => util.agruparSiglaPorHorario(siglaSinAgrupar));
        const combinaciones = this.generarCombinaciones(siglasAgrupadasFiltradas);
        cambios = false;

        this.setState({siglasAgrupadasFiltradas, combinaciones, cambios, siglasAgrupadasSinFiltrar});
    }

    generarCombinaciones(siglasAgrupadas) {
        if (siglasAgrupadas.length === 0) return [];

        let combinaciones = util.generarCombinaciones(siglasAgrupadas);
        return combinaciones;
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.buscarSiglas();
    }

    componentDidMount() {
        this.buscarSiglas();
    }

    render() {
        const { siglasAgrupadasSinFiltrar, combinaciones, seccionesSeleccionadas, buscando, errorEnBusqueda } = this.state;

        return (
            <div>
                <Navbar/>

                <div className="row">
                    <CursosCard
                        siglasAgrupadas={siglasAgrupadasSinFiltrar}
                        combinaciones={combinaciones}
                        borrarSigla={this.borrarSigla}
                        seccionesSeleccionadas={seccionesSeleccionadas}
                        elegirSeccion={this.elegirSeccion}/>
                    <BuscarCursoCard agregarSigla={this.agregarSigla} buscando={buscando} errorEnBusqueda={errorEnBusqueda}/>
                </div>

                <div className="row">
                    <CombinacionesCard combinaciones={combinaciones}/>
                </div>

            </div>
        );
    }
}

export default hot(module)(App);