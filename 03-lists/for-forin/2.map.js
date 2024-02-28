const service = require("./service");

//Criando nosso próprio map e mostrando como o map está trabalhando, trazendo um array novo
Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice); //Pegando a Lista e o item daquela Lista na posição
    //Adicionando o resultado para nossa lista
    novoArrayMapeado.push(resultado);
  }
  return novoArrayMapeado;
};

async function main() {
  try {
    const result = await service.obterPessoas(`a`);
    // const names = [];
    //Para cada item da lista'names' vai ser chamada essa funcao
    // result.results.forEach(function (item){
    //E vai adicionar esse item para minha lista
    //     names.push(item.name)
    // });

    //Utilizando o Map
    // const names = result.results.map(function (pessoa) {
    //   return pessoa.name;
    // });

    //De uma forma melhor ainda com Arrow Function
    // const names = result.results.map((pessoa) => pessoa.name)

    const names = result.results.meuMap(function (pessoa, indice) {
      return `[${indice}] ${pessoa.name}`;
    });
    console.log("names", names);
  } catch (error) {
    console.error("Deu ruim:", error);
  }
}

main();
