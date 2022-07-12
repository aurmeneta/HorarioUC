import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BotonAgregar from './BotonAgregar';

import { actualizarPeriodosDisponibles, periodosDisponibles, periodoSeleccionado } from '../../util/storage';

function BuscarCursoForm({
  periodo, buscando, agregarSigla, elegirPeriodo,
}) {
  const [sigla, setSigla] = useState('');
  const [periodos, setPeriodos] = useState(periodosDisponibles());

  useEffect(() => {
    actualizarPeriodosDisponibles().then(() => setPeriodos(periodosDisponibles()));
  }, []);

  function onWrite(event) {
    event.preventDefault();

    setSigla(event.target.value.toUpperCase());
  }

  const onChange = (event) => {
    event.preventDefault();

    elegirPeriodo(event.target.value);
  };

  const onClick = (event) => {
    event.preventDefault();

    if (sigla) agregarSigla(sigla);
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="#periodoInput" className="col-md-5 col-sm-3 col-form-label">Semestre</label>
        <div className="col-md-8 col-sm-9 mb-2">
          <select id="periodoInput" className="form-select" value={periodo} onChange={onChange}>
            {
                periodos.map((p) => <option key={p} value={p}>{p}</option>)
              }
          </select>
        </div>
      </div>

      <div className="alert alert-warning col-md-8 col-sm-9">
        Busca solo la sigla del curso, la sección o el profesor lo podrás elegir después.
      </div>

      <div className="form-group row">
        <label className="col-md-5 col-sm-3 col-form-label">Sigla</label>
        <div className="col-md-8 col-sm-9">
          <input
            type="text"
            name="sigla"
            className="form-control"
            placeholder="MAT1620"
            value={sigla}
            onChange={onWrite}
          />
        </div>
      </div>

      <div className="mt-2">
        <BotonAgregar onClick={onClick} buscando={buscando} />
      </div>
    </form>

  );
}

BuscarCursoForm.propTypes = {
  buscando: PropTypes.bool.isRequired,
  agregarSigla: PropTypes.func.isRequired,
  periodo: PropTypes.string,
  elegirPeriodo: PropTypes.func,
};

BuscarCursoForm.defaultProps = {
  periodo: periodoSeleccionado(),
  elegirPeriodo: () => null,
};

export default BuscarCursoForm;
