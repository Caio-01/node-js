const { get } = require("axios");

const URL = `https://swapi.dev/api/people`; //URL da API

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const result = await get(url);
  return result.data.results.map(mapearPessoas) //Mapeando conforme a funcao
}

function mapearPessoas(item){
    return{
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
  obterPessoas,
};
