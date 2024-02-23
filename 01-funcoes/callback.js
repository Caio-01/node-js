/*
----------ATIVIDADE------------
0 - Obter um Usuario
1 - Obter o numero de telefone de um usuario a partir de seu ID
2 - Obter o endereço do ususario pelo Id
*/

//Obtendo Usuario
function obterUsuario(callback) {
  setTimeout(function () {
    //Chamando o callback com o primeiro parametro o 'ERRO' e o segundo 'SUCESSO'
    //Simulando uma chamada de API
    return callback(null, {
      id: 1,
      nome: "Alan",
      dataNascimento: new Date(),
    });
  }, 1000);
}

//Obtendo numero de telefone

//o CALLBACK sempre será o ultimo parametro!
function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "98833553",
      ddd: 71,
    });
  }, 2000);
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

//Sicronizando as informacoes do usuario
function resolverUsuario(erro, usuario) {
  console.log("usuario:", usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  // null || "" || 0 === false no JS
  if (error) {
    console.error("Deu ruim em USUARIO mermao", error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("Deu ruim em TELEFONE mermao", error);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("Deu ruim em TELEFONE mermao", error1);
        return;
      }
      console.log(`
        Nome: ${usuario.nome},
        Endereco: ${endereco.rua},${endereco.numero},
        Telefone:(${telefone.ddd})${telefone.telefone}

      `);
    });
  });
});

// const telefone = obterTelefone(usuario.id);

// console.log("telefone:", telefone);
