const MIN = 1;
const MAX = 152;

const pokemonImg1 = $('#poke1Img');
const pokemonImg2 = $('#poke2Img');

const BASE_IMG_URL = 'https://pokeres.bastionbot.org/images/pokemon';
const BASE_API_URL = 'http://localhost:3000/api/pokemons';

var pokemonsData = [];

$(document).ready(function () {

  getPokemonsData();

  function getPokemonsData () {

    const POKE_1_ID = getRandomPokemonId();
    const POKE_2_ID = getRandomPokemonId();

    console.log('ids sorteados: ' + POKE_1_ID, POKE_2_ID);

    renderPokemonsImages(POKE_1_ID, POKE_2_ID);

    // BUSCA DADOS DO POKEMON 1
    $.ajax({
      type: 'GET',
      url: `${BASE_API_URL}/${POKE_1_ID}`,
      dataType: 'json',
      success: function (pokemon) {

        pokemonsData.push(pokemon[0]);
        console.log(pokemon);

        // SETA INFOS POKEMON 1 NO HTML
        $("#namePoke1").text(pokemon[0].name);
        $("#typesPoke1").text(print(pokemon[0].types));
        $("#votesPoke1").text(pokemon[0].votes);

        // BUSCA DADOS DO POKEMON 2
        $.ajax({
          type: 'GET',
          url: `${BASE_API_URL}/${POKE_2_ID}`,
          dataType: 'json',
          success: function (pokemon) {

            pokemonsData.push(pokemon[0]);
            console.log(pokemon);

            // SETA INFOS POKEMON 1 NO HTML
            $("#namePoke2").text(pokemon[0].name);
            $("#typesPoke2").text(print(pokemon[0].types));
            $("#votesPoke2").text(pokemon[0].votes);
          }

        });

      }
    });

    //console.log(pokemonsData);
  }

  function renderPokemonsImages(POKE_1_ID, POKE_2_ID) {
    
    pokemonImg1.attr('src', `${BASE_IMG_URL}/${POKE_1_ID}.png`);
    pokemonImg2.attr('src', `${BASE_IMG_URL}/${POKE_2_ID}.png`);
  }

  $('#btnRecarregar').click(getPokemonsData);

  $('#poke1Img').click( () => {
    // SE VOTAR NO POKEMON DA ESQUERDA, RECUPERAR OS DADOS DESSE POKEMON E CHAMAR A FUNÇÃO QUE FAZ O UPDATE DOS VOTOS
    registerVote(pokemonsData[0]);

    // BUSCA DOIS NOVOS POKEMONS PRA RINHA
    getPokemonsData();
  });

  $('#poke2Img').click( () => {
    // SE VOTAR NO POKEMON DA ESQUERDA, RECUPERAR OS DADOS DESSE POKEMON E CHAMAR A FUNÇÃO QUE FAZ O UPDATE DOS VOTOS
    registerVote(pokemonsData[1]);

    // BUSCA DOIS NOVOS POKEMONS PRA RINHA
    getPokemonsData();
  });

});


// FUNÇÕES AUXILIARES

function print (types) {
  
  var typesFormatted = types.join(' ');
  console.log(typesFormatted);
  
  return typesFormatted;
}

function getRandomPokemonId () {
  
  return (Math.round(Math.random() * (MAX - MIN) + MIN)).toString();
}

function registerVote (votedPokemon) {

  console.log('função registerVote()');

  console.log('votos: '+ votedPokemon.votes);

  $.ajax({ 
    type: 'PUT',
    url: `${BASE_API_URL}/${votedPokemon.pokeId}`,
    dataType: 'json',
    data: votedPokemon,
    sucess: function (response) {
      alert(response.data);
    }
   });

}