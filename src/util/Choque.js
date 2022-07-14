class Choque {
  constructor(sigla1, tipo1, sigla2, tipo2, permitido) {
    this.sigla1 = sigla1;
    this.tipo1 = tipo1;
    this.sigla2 = sigla2;
    this.tipo2 = tipo2;
    this.permitido = permitido;
  }

  vacio() {
    return this.sigla1 === '' && this.sigla2 === '' && this.tipo1 === '' && this.tipo2 === '';
  }

  toString() {
    return `${this.sigla1}-${this.tipo1}-${this.sigla2}-${this.tipo2}-${this.permitido.toString()}`;
  }

  static fromString(str) {
    const [sigla1, tipo1, sigla2, tipo2, permitido] = str.split('-');
    return new Choque(sigla1, tipo1, sigla2, tipo2, permitido === 'true');
  }
}

export default Choque;
