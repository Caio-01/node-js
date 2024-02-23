//Simulando que o usuário está clicando

const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = "usuario:click";
meuEmissor.on(nomeEvento, function (click) {
  console.log("um usuario clicou", click);
});

//Exemplo
// meuEmissor.emit(nomeEvento, "na barra de rolagem");
// meuEmissor.emit(nomeEvento, "no ok");

// let count = 0;
// setInterval(function () {
//   meuEmissor.emit(nomeEvento, "no ok" + (count++));
// }, 1000);

const stdin = process.openStdin(); //Variavel interna do node
stdin.addListener("data", function (value) {
  console.log(`Você digitou: ${value.toString().trim()} `); //transfromado em string e tirando os espaços
});


