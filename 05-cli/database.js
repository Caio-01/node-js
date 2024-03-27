const { readFile, writeFile } = require("fs"); //Importando a função "readFile" do módulo "fs"
const { waitForDebugger } = require("inspector");

const { promisify } = require("util"); //Importando a função "promisify" do módulo "util"

//Criando uma versão promissificada da função "readFile" e "writeFile"
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

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

  //Método para escrever dados no arquivo
  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados)); //Salvando os novos dados
    return true;
  }

  //Método para cadastrar o herói
  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivos(); //Obtendo os dados atuais do arquivo
    const id = heroi.id <= 2 ? heroi.id : Date.now(); //Gerando um novo ID para o herói (se o ID fornecido for maior que 2, usa o timestamp atual)

    const heroiComId = {
      id,
      ...heroi,
    }; // Concatenando um objeto com o ID gerado e os dados do herói

    const dadosFinal = [...dados, heroiComId]; //Concatenando o novo herói com os dados existentes

    const resultado = await this.escreverArquivo(dadosFinal); //Salvando os dados atualizados no arquivo
    return resultado;
  }

  //Método para listar dados (filtrados por ID, se fornecido)
  async listar(id) {
    const dados = await this.obterDadosArquivos(); //Obtendo dados do arquivo
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true)); //Filtrando dados com base no ID fornecido
    return dadosFiltrados; //Retornando os dados Filtrados
  }

  //Método para remover dados
  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([]); //Se não passar nenhum id, escreverArquivo vai receber um Array vazio
    }

    const dados = await this.obterDadosArquivos(); //Obtendo os dados atuais do arquivo
    const indice = dados.findIndex((item) => item.id === parseInt(id)); //Localizar o indice do item com o ID fornecido
    if (indice === -1) {
      throw Error("O herói informado não existe");
    }
    dados.splice(indice, 1); //Removendo o item do array de dados
    return await this.escreverArquivo(dados); //Retornando os dados atualizados no arquivo
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivos(); //Obtendo os dados atuais do arquivo
    const indice = dados.findIndex((item) => item.id === parseInt(id)); //Localizar o indice do item com o ID fornecido
    if (indice === -1) {
      throw Error("O herói informado não existe");
    }

    const atual = dados[indice]; //Obtendo o objeto atual

    const objetoAtualizar = {
      ...atual,
      ...modificacoes,
    }; //Criando um novo objeto com as modificações

    dados.splice(indice, 1); //Removendo o item antigo da lista

    return await this.escreverArquivo([...dados, objetoAtualizar]); //Retornando o arquivo com os dados atualizados
  }
}

module.exports = new Database(); //Exportando uma instância da classe "Database"
