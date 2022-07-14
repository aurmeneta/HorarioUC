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

import { Provider } from '@rollbar/react';
import React from 'react';
import Rollbar from 'rollbar';

import rollbarConfig from './util/rollbar-config';

import ChoquesTable from './components/Tables/ChoquesTable';
import Layout from './components/Layout';

const rollbar = new Rollbar(rollbarConfig);

function ChoquesApp() {
  return (
    <React.StrictMode>
      <Provider instance={rollbar}>
        <Layout>
          <div className="alert alert-info">
            <strong>Intrucciones para permitir el choque de módulos</strong>
            <ol>
              <li>Agrega los cursos desde la página de inicio.</li>
              <li>Agrega una nueva regla.</li>
              <li>Selecciona las siglas y tipos de módulos correspondientes.</li>
              <li>
                Los cambios se guardan automáticamente, vuelve a la página de inicio y
                las combinaciones se generarán considerando las reglas configuradas.
              </li>
            </ol>
            Por defecto los choques no se permiten, por lo que cualquier choque no
            explícitamente habilitado en las reglas no se permitirá.
            {' '}
            <br />
            Esta función es nueva y no está completamente probada.
            Puede ser que algunas combinaciones sean omitidas.
          </div>

          <ChoquesTable />
        </Layout>
      </Provider>
    </React.StrictMode>
  );
}

export default ChoquesApp;
