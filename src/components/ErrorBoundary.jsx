import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';

function FallbackUI() {
  return (
    <div className="col">
      <h3>Ha ocurrido un error y este componente no se ha podido renderizar</h3>
    </div>
  );
}

function ErrorBoundary(props) {
  const { children } = props;
  return (
    <RollbarErrorBoundary fallbackUI={FallbackUI}>
      {children}
    </RollbarErrorBoundary>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ErrorBoundary;
