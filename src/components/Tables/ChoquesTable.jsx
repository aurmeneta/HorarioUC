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

import React, { useEffect, useState } from 'react';

import Choque from '../../util/Choque';
import { guardarChoques, cargarChoques } from '../../util/storage';
import FilaChoque from './FilaChoque';

function ChoquesTable() {
  const [choques, setChoques] = useState(cargarChoques());

  useEffect(() => {
    guardarChoques(choques);
  }, [choques]);

  const agregar = (event) => {
    event.preventDefault();

    if (choques.length === 0 || !choques.at(-1).vacio()) {
      const nuevoChoque = new Choque('', '', '', '', true);
      setChoques([...choques, nuevoChoque]);
    }
  };

  const setChoque = (index, choque) => {
    const nuevosChoques = [...choques];
    nuevosChoques[index] = choque;
    setChoques(nuevosChoques);
  };

  const deleteChoque = (index) => {
    const nuevosChoques = [...choques];
    nuevosChoques.splice(index, 1);
    setChoques(nuevosChoques);
  };

  return (
    <>
      <h5>Reglas de Choques</h5>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Sigla</th>
              <th>Tipo</th>
              <th>Sigla</th>
              <th>Tipo</th>
              <th>¿Permitido?</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {choques.map((choque, index) => (
              <FilaChoque
                key={`${choque.sigla1}-${choque.tipo1}-${choque.sigla2}-${choque.tipo2}`}
                choque={choque}
                index={index}
                setChoque={setChoque}
                deleteChoque={deleteChoque}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={agregar} className="btn btn-primary">Agregar regla</button>
    </>
  );
}

export default ChoquesTable;
