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

import * as util from "./util";

import Horario from "./components/Horario"
import Navbar from "./components/Navbar";
import CursosCard from "./components/Cards/CursosCard";
import BuscarCursoCard from "./components/Cards/BuscarCursoCard";
import CombinacionesCard from "./components/Cards/CombinacionesCard";

const periodo = "2020-2";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siglas: [],
            siglasSinAgrupar: [],
            siglasAgrupadas: [],
            combinaciones: []
        }

        this.agregarSigla = this.agregarSigla.bind(this);
        this.buscarSiglas = this.buscarSiglas.bind(this);
        this.agruparSiglas = this.agruparSiglas.bind(this);

    }

    agregarSigla(sigla) {
        this.setState(prevState => {
            let {siglas} = prevState;
            if (!siglas.includes(sigla)) siglas.push(sigla);
            return {siglas}
        });
    }

    buscarSiglas() {
        const { siglas, siglasSinAgrupar } = this.state;
        let siglasNuevas = [];

        siglas.forEach(sigla => siglasSinAgrupar.every(s => s.sigla !== sigla) ? siglasNuevas.push(sigla) : null);

        if (siglasNuevas.length === 0) return;

        util.buscarSiglas(periodo, siglasNuevas).then(siglasNuevasSinAgrupar => {
            this.setState(prevState => {
                let { siglasSinAgrupar } = prevState;
                siglasSinAgrupar = siglasSinAgrupar.concat(siglasNuevasSinAgrupar);
                return { siglasSinAgrupar }
            });
        });
    }

    agruparSiglas() {
        let { siglasSinAgrupar, siglasAgrupadas } = this.state;
        let siglasAgrupar = [];

        siglasSinAgrupar.forEach(sigla => siglasAgrupadas.every(s => sigla.sigla !== s.sigla) ? siglasAgrupar.push(sigla) : null);

        if (siglasAgrupar.length === 0) return;

        let nuevasSiglasAgrupadas = siglasAgrupar.map(siglaSinAgrupar => util.agruparSiglaPorHorario(siglaSinAgrupar));
        siglasAgrupadas = siglasAgrupadas.concat(nuevasSiglasAgrupadas);
        this.setState({siglasAgrupadas})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.agruparSiglas();
    }

    render() {
        this.buscarSiglas();

        const { siglasAgrupadas } = this.state;
        return (
            <div>
                <Navbar/>

                <div className="row m-1">
                    <CursosCard siglasAgrupadas={siglasAgrupadas}/>
                    <BuscarCursoCard agregarSigla={this.agregarSigla}/>
                </div>

                <div className="row m-1">
                    <CombinacionesCard/>
                </div>

            </div>
        );
    }
}

export default hot(module)(App);