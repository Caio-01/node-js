const assert = require("assert"); //Modulo de assercao
const { obterPessoas } = require("./service"); //Modulo de service

//Para comecar com o Mocha
describe("Star Wars Tests", () => {
  //Definindo os testes que vao rodar
  it("deve buscar o r2d2 com o formato correto", async () => {
    const expected = [{ nome: "R2-D2", peso: "96" }]; //Definindo o esperado
    const nomeBase = "r2-d2";

    const resultado = await obterPessoas(nomeBase);
    assert.deepEqual(resultado, expected);//Teste
  });
});
