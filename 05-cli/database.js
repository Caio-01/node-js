const { readFile } = require("fs"); //Importando Módulo

const { promisify } = require("util"); //Importado Módulo para promisse

const readFileAsync = promisify(readFile);

//outra forma de obter dados do JSON
//const dadosJson = require('./herois.json')

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosArquivos() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  escreverArquivo() {}

  async listar(id) {
    const dados = await this.obterDadosArquivos();
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));
    return null;
  }
}

module.exports = new Database(); //exportando a instância
