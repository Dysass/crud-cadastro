class Pessoa {
    constructor(nome, cpf, cep, numero, complemento, logradouro, bairro, cidade, uf) {
      this.nome = nome;
      this.cpf = cpf;
      this.numero = numero;
      this.complemento = complemento;
      this.logradouro = logradouro;
      this.bairro = bairro;
      this.cidade = cidade;
      this.uf = uf;
    }
}

module.exports = Pessoa;