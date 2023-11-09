class Pessoa {
    constructor(nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf) {
      this.nome = nome;
      this.cpf = cpf;
      this.cep = cep;
      this.numero = numero;
      this.complemento = complemento;
      this.logradouro = logradouro;
      this.bairro = bairro;
      this.localidade = localidade;
      this.uf = uf;
    }
}

module.exports = Pessoa;