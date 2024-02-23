/*
----------ATIVIDADE - REFATORANDO PARA PROMISES ASYNC / AWAIT------------
0 - Obter um Usuario
1 - Obter o numero de telefone de um usuario a partir de seu ID
2 - Obter o endereço do ususario pelo Id
*/
//impotando um modulo pinterno do node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

//Obtendo Usuario
function obterUsuario() {
  //Quando acontecer um problema -> reject(ERRO)
  //Quando tiver sucesso -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      //return reject(new Error('Deu ruim pra caramba')) -> testando o error
      //Simulando uma chamada de API
      return resolve({
        id: 1,
        nome: "Alan",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

//Obtendo numero de telefone
function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "98833553",
        ddd: 71,
      });
    }, 2000);
  });
}

//Obtendo endereco
function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos rios",
      numero: 10,
    });
  }, 2000);
}

// 1- adicionar a palavra async -> automaticamente ela retornará uma Promise
main(); //Chamando o Metodo
async function main() {
  try {
    console.time("medida-promise"); //testando tempo de execução

    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);

    //Mandando a assinatura dos metodos para melhorar a velocidade de execução
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);

    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone}
        Endereço: ${endereco.rua}, ${endereco.numero}
    `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("Deu ruim", error);
  }
}
