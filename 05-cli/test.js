const { deepEqual, equal } = require("assert"); // Importando metodo deepEqual, equal do assert

const DEFAULT_ITEM_CADASTAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};

//Iniciando o conjunto de testes com o Mocha
describe("Suite de manipulação de herois", () => {
  //Definindo o caso de teste
  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTAR;

    ok(null, expected)
  })

  //   it("deve cadastar um heroi, usando arquivos", async () => {
  //     //Definindo o esperado
  //     const expected = DEFAULT_ITEM_CADASTAR;
  //     //
  //     ok(null, expected);
  //   });
});
