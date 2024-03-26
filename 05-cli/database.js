const { readFile, writeFile } = require("fs"); //Importando a função "readFile" do módulo "fs"

const { promisify } = require("util"); //Importando a função "promisify" do módulo "util"

const readFileAsync = promisify(readFile); //Criando uma versão promissificada da função "readFile"
const writeFileAsync = promisify(writeFile); //Criando uma versão promissificada da função "writeFile"

//Outra forma de obter dados do JSON
//const dadosJson = require('./herois.json')

//Definindo uma classe chamada "Database"
class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json"; //Definindo o nome do arquivo JSON a ser usado
  }

  //Método para obter dados do arquivo
  async obterDadosArquivos() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8"); //Obtendo tudo que tem nesse arquivo => NOME_ARQUIVO
    return JSON.parse(arquivo.toString());
  }

  //Método para
  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados)); //Salvando os novos dados
    return true;
  }

  //Método para cadastrar o heroi
  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivos(); //
    const id = heroi.id <= 2 ? heroi.id : Date.now();

    const heroiComId = {
      id,
      ...heroi,
    }; // Concatenando o id gerado e com o objeto que veio de heroi

    const dadosFinal = [...dados, heroiComId];

    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado;
  }

  //Método para listar dados (filtrados por ID, se fornecido)
  async listar(id) {
    const dados = await this.obterDadosArquivos(); //Obtendo dados do arquivo
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true)); //Filtrando dados com base no ID fornecido
    return dadosFiltrados; //Retornando os dados Filtrados
  }
}

module.exports = new Database(); //Exportando uma instância da classe "Database"
