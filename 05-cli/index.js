//Importando os módulos necessários
const { Command } = require("commander"); //Importando o módulo Commander
const Commander = new Command(); //Criando uma instância do Commander
const options = Commander.opts(); //Obtendo as opções passadas na linha de comando
const Database = require("./database"); //Importando o módulo database
const Heroi = require("./heroi"); //Importando o módulo heroi

//Função main
async function main() {
  //Configurando a versão do programa
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Herói")
    .option("-p, --poder [value]", "Poder do Herói")
    .option("-i --id [value]", "Id do Herói")

    .option("-c, --cadastrar", "Cadastrar um Herói")
    .option("-l, --listar", "Listar um Herói")
    .option("-r, --remover", "Remove um Herói pelo id")
    .option("-a, --atualizar [value]", "Atualizar um Herói pelo id");

  Commander.parse(process.argv); //Fazendo o parse dos argumentos da linha de comando

  const heroi = new Heroi(options); //Criando uma instância do herói com as opções fornecidas

  try {
    //CADASTRAR
    if (options.cadastrar) {
      delete heroi.id; //Removendo o ID para evitar conflitos

      const resultado = await Database.cadastrar(heroi); //Cadastrando o herói
      if (!resultado) {
        console.error("Herói não foi cadastrado");
        return;
      }
      console.log("Herói Cadastrado com sucesso!");
    }

    //LISTAR
    if (options.listar) {
      const resultado = await Database.listar(); //Listando os heróis
      console.log(resultado);
      return;
    }

    //REMOVER
    if (options.remover) {
      const resultado = await Database.remover(heroi.id); //Removendo o herói pelo ID
      if (!resultado) {
        console.error("Não foi possivel remover o herói");
        return;
      }
      console.log("Herói Removido com sucesso!");
    }

    //ATUALIZAR
    if (options.atualizar) {
      const idParaAtualizar = parseInt(options.atualizar); //Obtendo o ID para atualização

      //Removendo todas as chaves que estiverem com undefined || null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      ); //Atualizando o herói

      if (!resultado) {
        console.error("Não foi possivel atualizar o herói");
        return;
      }
      console.log("Herói Atualizado com sucesso!");
    }
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
