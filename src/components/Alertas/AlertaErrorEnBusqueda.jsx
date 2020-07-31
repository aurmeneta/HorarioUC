import React from 'react';

function AlertaErrorEnBusqueda(props) {
    const { errorEnBusqueda } = props;

    if (errorEnBusqueda) {
        return (
            <div className={"alert alert-danger mt-2 w-auto"}>
                {errorEnBusqueda}
            </div>
        );
    }
    return null;
}

export default AlertaErrorEnBusqueda;