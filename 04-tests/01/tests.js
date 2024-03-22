const assert = require("assert"); //Módulo de 'assert' para asserções
const { obterPessoas } = require("./service"); //Importando a função 'obterPessoas' do módulo './service'

//Instalando o pacote 'nock', para simular requisições HTTP
const nock = require("nock");

//Iniciando o conjunto de testes com o Mocha
describe("Star Wars Tests", function () {
  //Antes de executar qualquer teste individual ('it'), ele vai executar essa tarefa:
  this.beforeAll(() => {
    //Definindo uma resposta simulada para a solicitação da API que busca o personagem 
    const response = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: "R2-D2",
          height: "96",
          mass: "32",
          hair_color: "n/a",
          skin_color: "white, blue",
          eye_color: "red",
          birth_year: "33BBY",
          gender: "n/a",
          homeworld: "https://swapi.dev/api/planets/8/",
          vehicles: [],
          starships: [],
          created: "2014-12-10T15:11:50.376000Z",
          edited: "2014-12-20T21:17:50.311000Z",
          url: "https://swapi.dev/api/people/3/",
        },
      ],
    };

    //Configurando o nock para a requisição da API
    nock("https://swapi.dev/api/people")
      .get("/?search=r2-d2&format=json")
      .reply(200, response);
  });

  //Definindo o caso de teste
  it("deve buscar o r2d2 com o formato correto", async () => {
    //Definindo o Resultado esperado
    const expected = [{ nome: "R2-D2", peso: "96" }];

    //Definindo o nome para a busca
    const nomeBase = "r2-d2";

    //Chamando a função 'obterPessoas' como o 'nomeBase'
    const resultado = await obterPessoas(nomeBase);

    //Teste => verificando se o resultado é igual ao esperado
    assert.deepEqual(resultado, expected);
  });
});
