//Importanto apenas uma funcao especifica utiliando o '{}'
const { obterPessoas } = require("./service");

//Criando nossa propria implementaçao do Reduce
Array.prototype.meuReduce = function (callback, valorInicial) {
  //Fazendo a codição
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];

  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");
    const pesos = results.map((item) => parseInt(item.height)); // parseInt para não retorar string
    console.log("pesos", pesos);
    // [20.2, 30.3, 40.5] = 0
    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo;
    // },0);
    const minhaLista = [
      ["Caio", "Santos"],
      ["NodeBR", "Nerdzão"],
    ];
    //Utilizando nosso Reduce
    const total = minhaLista
      .meuReduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");
    console.log("total:", total);
  } catch (error) {
    console.error("DEU RUIM:", error);
  }
}

main();
