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
import PropTypes from 'prop-types';

import { TIPOS } from '@aurmeneta/buscacursos-uc/lib/cursos/Modulo';
import { siglasGuardadas } from '../../util/storage';

import Choque from '../../util/Choque';

function FilaChoque({
  choque, setChoque, index, deleteChoque,
}) {
  const setSigla1 = (event) => {
    event.preventDefault();
    const nuevoChoque = new Choque(
      event.target.value,
      choque.tipo1,
      choque.sigla2,
      choque.tipo2,
      choque.permitido,
    );
    setChoque(index, nuevoChoque);
  };

  const setSigla2 = (event) => {
    event.preventDefault();
    const nuevoChoque = new Choque(
      choque.sigla1,
      choque.tipo1,
      event.target.value,
      choque.tipo2,
      choque.permitido,
    );
    setChoque(index, nuevoChoque);
  };

  const setTipo1 = (event) => {
    event.preventDefault();
    const nuevoChoque = new Choque(
      choque.sigla1,
      event.target.value,
      choque.sigla2,
      choque.tipo2,
      choque.permitido,
    );
    setChoque(index, nuevoChoque);
  };

  const setTipo2 = (event) => {
    event.preventDefault();
    const nuevoChoque = new Choque(
      choque.sigla1,
      choque.tipo1,
      choque.sigla2,
      event.target.value,
      choque.permitido,
    );
    setChoque(index, nuevoChoque);
  };

  const setPermitido = (event) => {
    const nuevoChoque = new Choque(
      choque.sigla1,
      choque.tipo1,
      choque.sigla2,
      choque.tipo2,
      event.target.checked,
    );
    setChoque(index, nuevoChoque);
  };

  const borrar = (event) => {
    event.preventDefault();
    deleteChoque(index);
  };

  return (
    <tr>
      <td><SelectSigla sigla={choque.sigla1} onChange={setSigla1} /></td>
      <td><SelectTipo tipo={choque.tipo1} onChange={setTipo1} /></td>
      <td><SelectSigla sigla={choque.sigla2} onChange={setSigla2} /></td>
      <td><SelectTipo tipo={choque.tipo2} onChange={setTipo2} /></td>
      <td><input className="form-check-input" type="checkbox" checked={choque.permitido} onChange={setPermitido} /></td>
      <td><button type="button" className="btn btn-danger" onClick={borrar}>X</button></td>
    </tr>
  );
}

FilaChoque.propTypes = {
  choque: PropTypes.instanceOf(Choque).isRequired,
  setChoque: PropTypes.func.isRequired,
  deleteChoque: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function SelectSigla({ sigla, onChange }) {
  return (
    <select onChange={onChange} value={sigla} className="form-select-sm">
      <option value="">-</option>
      <option value="*">Cualquiera</option>
      {siglasGuardadas().map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

SelectSigla.propTypes = {
  sigla: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function SelectTipo({ tipo, onChange }) {
  return (
    <select onChange={onChange} value={tipo} className="form-select-sm">
      <option value="">-</option>
      <option value="*">Cualquiera</option>
      {TIPOS.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}

SelectTipo.propTypes = {
  tipo: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilaChoque;
