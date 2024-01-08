import React from 'react';
import PropTypes from 'prop-types';

import { cargarChoques } from '../../util/storage';

import Horario from '../Tables/Horario';
import TablaCombinacion from '../Tables/TablaCombinacion';
import ErrorBoundary from '../ErrorBoundary';
import Grupo from '../../util/Grupo';

const choques = cargarChoques().filter((choque) => choque.valido());

class CombinacionesCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.siguiente = this.siguiente.bind(this);
    this.anterior = this.anterior.bind(this);
    this.resetIndex = this.resetIndex.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevCom = prevProps.combinaciones;
    const { combinaciones: newCom } = this.props;

    if (prevCom !== newCom) {
      this.resetIndex();
    }
  }

  resetIndex() {
    this.setState({ index: 0 });
  }

  siguiente(event) {
    event.preventDefault();

    this.setState((state) => {
      const { index } = state;
      const { combinaciones } = this.props;

      if (index >= (combinaciones.length - 1)) return { index: (combinaciones.length - 1) };
      return { index: index + 1 };
    });
  }

  anterior(event) {
    event.preventDefault();

    this.setState((state) => {
      const { index } = state;

      if (index > 0) return { index: index - 1 };
      return {};
    });
  }

  render() {
    const {
      combinaciones, guardarCursoCupos, semestre, errorEnCombinaciones,
    } = this.props;
    const { length } = combinaciones;
    let { index } = this.state;

    if (index >= length && length !== 0) {
      index = length - 1;
    } else if (length === 0 && index !== 0) {
      index = 0;
    }

    return (
      <div className="col">
        <div className="card border-0">
          <div className="card-body">
            <ErrorBoundary>
              {
                choques.length > 0 ? (
                  <div className="alert alert-warning">
                    Se permiten los siguientes choques:
                    <ul>
                      {
                        choques.map((choque) => (<li>{choque.toRepr()}</li>))
                      }
                    </ul>
                    Esta función es experimental y podrían omitirse algunas combinaciones.
                    <br />
                    En
                    {' '}
                    <a href="/choques.html">configuración de choques</a>
                    {' '}
                    puedes cambiar estas reglas.
                  </div>
                ) : null
              }

              {
                errorEnCombinaciones ? (
                  <div className="alert alert-danger">
                    Hubo un error al generar las combinaciones.
                    Por favor, intenta eliminar o cambiar los choques.
                  </div>
                ) : null
              }

              {
              combinaciones.length === 0 ? <p>No hay combinaciones</p>
                : (
                  <div className="row">
                    <Horario
                      combinacion={combinaciones[index]}
                      siguiente={this.siguiente}
                      anterior={this.anterior}
                      semestre={semestre}
                      index={index}
                    />
                    <TablaCombinacion
                      combinacion={combinaciones[index]}
                      guardarCursoCupos={guardarCursoCupos}
                    />
                    <br />
                  </div>
                )
              }
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  }
}

CombinacionesCard.propTypes = {
  combinaciones: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Grupo))).isRequired,
  guardarCursoCupos: PropTypes.func.isRequired,
  semestre: PropTypes.string.isRequired,
  errorEnCombinaciones: PropTypes.bool,
};

CombinacionesCard.defaultProps = {
  errorEnCombinaciones: false,
};

export default CombinacionesCard;
