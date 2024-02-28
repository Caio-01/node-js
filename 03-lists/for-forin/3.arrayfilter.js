//Importanto apenas uma funcao especifica utiliando o '{}'
const { obterPessoas } = require("./service");

//Criando nossa propria implementaçao do Filter
Array.prototype.meuFilter = function (callback) {
  const lista = [];
  for (index in this) {
    const item = this[index]; //index é a posiçao do array
    const result = callback(item, index, this);
    // =, "". null, undefined === false
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};
async function main() {
  try {
    const { results } = await obterPessoas(`a`);

    // const familiaLars = results.filter(function (item) {
    //   //por padrão precisa retornar um booleano
    //   //para informar se deve manter ou remover da lista
    //   //false > remove da lista
    //   //true > mantem na lista
    //   //não encontrou = -1
    //   //encontrou = posiçao no array

    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
    //   return result;
    // });
    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length);
      return item.name.toLowerCase().indexOf(`lars`) !== -1;
    });
    const names = familiaLars.map((pessoa) => pessoa.name);
    console.log(names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
