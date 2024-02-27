const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");

    //Chamando todos o nomes da API e printar na tela
    const names = [];

    // Utilizando o FOR
    console.time("for");
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i]; //guardando o objeto
      names.push(pessoa.name); //adicionando na lista
    }
    console.timeEnd("for");

    //Utilizando o FOR IN
    console.time("forin");
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("forin");

    //Utilizando o FOR OF
    console.time("forof");
    for (pessoa of result.results) {
      names.push(pessoa.name);
    }

    console.timeEnd("forof");
    console.log(`names`, names);
  } catch (error) {
    console.error(`error interno:`, error);
  }
}

main();
