/*
----------ATIVIDADE - PROMISES ASYNC / AWAIT------------
-----------Compra de Produto------------
0 - Obter um Usuario
1 - Obter o nome do Produto
2 - Obter a forma de pagamento
*/

//Obtendo o Usuario
function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Mike",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

//Obtendo o Produto
function obterProduto() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        nomeProd: "Fechadura",
        precoProd: 15.0,
      });
    });
  });
}

//Obtendo a forma de Pagamento
function ObterPagamento() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        pagPix: "Pix",
        pagDin: "Din",
        pagCartao: "Cartao",
      });
    });
  });
}

//Chamando a Funcao
main();

//Funcao Assincrona
async function main() {
  try {
    console.time("medida-promise"); //testando tempo de execução
    //nomeando as funcoes, para buscar os valores
    const usuario = await obterUsuario();

    //Mandando a assinatura dos metodos para melhorar a velocidade de execução
    const resultado = await Promise.all([obterProduto(), ObterPagamento()]);

    const produto = resultado[0];
    const pagamento = resultado[1];

    console.log(`
        Nome: ${usuario.nome}
        senha: ${usuario.id}
        produto: ${produto.nomeProd}/preço: $${produto.precoProd}
        Forma de pagamento: ${pagamento.pagPix}
    `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("Deu ruim", error);
  }
}
