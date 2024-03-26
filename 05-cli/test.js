const { deepEqual, ok } = require("assert"); // Importando metodo deepEqual, ok do módulo assert

const dataBase = require("./database"); //Importando o dataBase

const DEFAULT_ITEM_CADASTAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};

//Iniciando o conjunto de testes com o Mocha
describe("Suite de manipulação de herois", () => {
  before(async () => {
    await dataBase.cadastrar(DEFAULT_ITEM_CADASTAR);
  });
  //Definindo o caso de teste
  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTAR;
    const [resultado] = await dataBase.listar(expected.id); //Listando o usuário com o id específico

    deepEqual(resultado, expected);
  });

  it("deve cadastar um heroi, usando arquivos", async () => {
    //Definindo o caso de teste
    const expected = DEFAULT_ITEM_CADASTAR;
    const resultado = await dataBase.cadastrar(DEFAULT_ITEM_CADASTAR);
    const [actual] = await dataBase.listar(DEFAULT_ITEM_CADASTAR.id);
    deepEqual(actual, expected);
  });
});
