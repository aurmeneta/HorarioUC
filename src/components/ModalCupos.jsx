import 'bootstrap/js/src/modal';
import React from 'react';
import PropTypes from 'prop-types';

import { obtenerCupos } from '../Util/util';
import TablaCupos from './Tables/TablaCupos';

class ModalCupos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cupos: {},
      cargando: true,
    };
  }

  componentDidMount() {
    this.obtenerCupos();
  }

  componentDidUpdate(prevProps) {
    const { curso } = this.props;
    if (prevProps.curso.nrc !== curso.nrc) {
      this.obtenerCupos();
    }
  }

  obtenerCupos() {
    const { curso, periodo } = this.props;
    if (curso.nrc) {
      this.setState({ cargando: true });
      obtenerCupos(periodo, curso.nrc)
        .then((cupos) => this.setState({ cupos, cargando: false }));
    }
  }

  render() {
    const { curso } = this.props;
    const { cargando, cupos } = this.state;

    if (cargando) {
      return (
        <div className="modal" tabIndex="-1" id="modalCupos">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`${curso.sigla} - ${curso.nombre}`}</h5>
                <button className="close" data-dismiss="modal" type="button">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <div className="spinner-border">
                  <span className="sr-only">Cargando...</span>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal" type="button">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="modal" tabIndex="-1" id="modalCupos">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${curso.sigla} - ${curso.nombre}`}</h5>
              <button className="close" data-dismiss="modal" type="button">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <TablaCupos cupos={cupos} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal" type="button">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalCupos.propTypes = {
  curso: PropTypes.shape({
    nrc: PropTypes.string,
    nombre: PropTypes.string,
    sigla: PropTypes.string,
  }),
  periodo: PropTypes.string.isRequired,
};

ModalCupos.defaultProps = {
  curso: { nrc: '', sigla: '', nombre: '' },
};

export default ModalCupos;
