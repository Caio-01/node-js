const { deepEqual, ok } = require("assert"); // Importando metodo deepEqual, ok do módulo assert

const dataBase = require("./database"); //Importando o dataBase

const DEFAULT_ITEM_CADASTAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};

//Iniciando o conjunto de testes com o Mocha
describe("Suite de manipulação de herois", () => {
  //Definindo o caso de teste
  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTAR;
    const [resultado] = await dataBase.listar(expected.id); //Listando o usuário com o id específico

    deepEqual(resultado, expected);
  });

  //   it("deve cadastar um heroi, usando arquivos", async () => {
  //     //Definindo o esperado
  //     const expected = DEFAULT_ITEM_CADASTAR;
  //     //
  //     ok(null, expected);
  //   });
});
