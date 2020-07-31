import React from 'react';
import BotonAgregar from "./BotonAgregar";

class BuscarCursoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sigla: ""
        }

        this.onWrite = this.onWrite.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onWrite(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value.toUpperCase()
        });
    }

    onClick(event) {
        event.preventDefault();

        let { sigla } = this.state;

        if (!sigla) return;

        this.props.agregarSigla(this.state.sigla);
    }

    render() {
        const { buscando } = this.props;

        return (
            <form>
                <div className="form-group row">
                    <label className="col-md-5 col-sm-3 col-form-label">Semestre</label>
                    <div className="col-md-8 col-sm-9">
                        <input type="text" readOnly className="form-control-plaintext" value="2020-2"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-md-5 col-sm-3 col-form-label">Sigla</label>
                    <div className="col-md-8 col-sm-9">
                        <input type="text" name="sigla"
                               className="form-control"
                               value={this.state.sigla}
                               onChange={this.onWrite}/>
                    </div>
                </div>

                <BotonAgregar onClick={this.onClick} buscando={buscando}/>
            </form>
        );
    }
}

export default BuscarCursoForm;