/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import BotonAgregar from './BotonAgregar';

class BuscarCursoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sigla: '',
    };

    this.onWrite = this.onWrite.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onWrite(event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value.toUpperCase(),
    });
  }

  onClick(event) {
    event.preventDefault();

    const { sigla } = this.state;
    const { agregarSigla } = this.props;

    if (!sigla) return;

    agregarSigla(sigla);
  }

  render() {
    const { buscando } = this.props;
    const { sigla } = this.state;

    return (
      <form>
        <div className="form-group row">
          <label htmlFor="#periodoInput" className="col-md-5 col-sm-3 col-form-label">Semestre</label>
          <div className="col-md-8 col-sm-9">
            <input id="periodoInput" type="text" readOnly className="form-control-plaintext" value="2022-1" />
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
              onChange={this.onWrite}
            />
          </div>
        </div>

        <BotonAgregar onClick={this.onClick} buscando={buscando} />
      </form>
    );
  }
}

BuscarCursoForm.propTypes = {
  buscando: PropTypes.bool.isRequired,
  agregarSigla: PropTypes.func.isRequired,
};

export default BuscarCursoForm;
