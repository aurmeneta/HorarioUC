import React from "react";

class FilaCombinacion extends React.Component {
    render() {
        const { grupo } = this.props;
        let { nombre, sigla } = grupo;
        let secciones = [...grupo.secciones];
        secciones = secciones.sort( (s1, s2) => s1.seccion - s2.seccion);
        let { length } = secciones;
        let primeraSeccion = secciones.shift();

        if (!primeraSeccion) return (<p>No hay primera seccion</p>);

        return (
            <React.Fragment>
                <tr>
                    <td rowSpan={length} className="align-middle">{sigla}</td>
                    <td rowSpan={length} className="align-middle">{nombre}</td>
                    <td>{primeraSeccion.seccion}</td>
                    <td>{primeraSeccion.nrc}</td>
                    <td>{primeraSeccion.profesor.toLocaleString().replace(",", ", ")}</td>
                    <td>{primeraSeccion.vacantes_disponibles}</td>
                </tr>
                {
                    secciones.map( ({seccion, nrc, profesor, vacantes_disponibles}) =>
                        <tr key={seccion}>
                            <td>{seccion}</td>
                            <td>{nrc}</td>
                            <td>{profesor.toLocaleString().replace(",", ", ")}</td>
                            <td>{vacantes_disponibles}</td>
                        </tr>
                    )
                }
            </React.Fragment>
        );
    }
}

export default FilaCombinacion;