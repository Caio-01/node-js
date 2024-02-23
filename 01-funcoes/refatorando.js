/*
----------ATIVIDADE - REFATORANDO PARA PROMISES------------
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

const usuarioPromise = obterUsuario();
// Para manipular o sucesso usamos a função -> .then
// Para manipular o erros usamos a função -> .catch
// Pode criar o mesmo nome os parametros, porque está em outro contexto
// usuario -> telefone ->
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result) {
      //Passando o Usuario para frente
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco
    .then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua},${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function (error) {
    console.error("DEU RUIM", error);
  });
