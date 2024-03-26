const { deepEqual, ok } = require("assert"); // Importando metodo deepEqual, ok do módulo assert

const dataBase = require("./database"); //Importando o dataBase

const DEFAULT_ITEM_CADASTAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};

//Iniciando o conjunto de testes com o Mocha
describe("Suite de manipulação de herois", () => {
  //Antes de cada teste, cadastra um herói padrão
  before(async () => {
    await dataBase.cadastrar(DEFAULT_ITEM_CADASTAR);
  });
  //Teste: deve pesquisar um herói usando arquivos
  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTAR;
    const [resultado] = await dataBase.listar(expected.id); //Listando o herói com o id específico

    deepEqual(resultado, expected); //Verificando se o resultado é igual ao esperado
  });

  //Teste: deve cadastrar um herói, usando arquivos
  it("deve cadastar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTAR;
    const resultado = await dataBase.cadastrar(DEFAULT_ITEM_CADASTAR); //Cadastrando o herói padrão
    const [actual] = await dataBase.listar(DEFAULT_ITEM_CADASTAR.id); //Listando o herói com o ID padrão
    deepEqual(actual, expected); //Verificando se o resultado é igual ao esperado
  });
});
