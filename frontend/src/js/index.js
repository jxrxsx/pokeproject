const NODE_API_DEV_ENV = 'http://localhost:3000/api'; 
const NODE_API_PROD_ENV = 'https://pokerinha.herokuapp.com/api';

const IMG_API_DEFAULT_ENV = 'https://pokeres.bastionbot.org/images/pokemon';

const MIN = 1;
const MAX = 151;

const pokemonImg1 = $('#poke1Img');
const pokemonImg2 = $('#poke2Img');

const BASE_IMG_URL = IMG_API_DEFAULT_ENV;
const BASE_API_URL = NODE_API_PROD_ENV;
const CONTROLLER = 'pokemons';

var pokemonsData = [];

$(document).ready(function () {

  getPokemonsData();
  
  $('#btnRecarregar').click(getPokemonsData);

  $('#poke1Img').click( () => {
    // SE VOTAR NO POKEMON DA ESQUERDA, RECUPERAR OS DADOS DESSE POKEMON E CHAMAR A FUNÇÃO QUE FAZ O UPDATE DOS VOTOS
    //console.log('pokemon votado: ');
    //console.log(pokemonsData[0]);
    registerVote(pokemonsData[0]);
  });

  $('#poke2Img').click( () => {
    // SE VOTAR NO POKEMON DA ESQUERDA, RECUPERAR OS DADOS DESSE POKEMON E CHAMAR A FUNÇÃO QUE FAZ O UPDATE DOS VOTOS
    //console.log('pokemon votado: ');
    //console.log(pokemonsData[1]);
    registerVote(pokemonsData[1]);

  });

});


// FUNÇÕES AUXILIARES
function getPokemonsData () {

  const [ POKE_1_ID, POKE_2_ID ] = getRandomPokemonId();

  renderPokemonsImages(POKE_1_ID, POKE_2_ID);

  // BUSCA DADOS DO POKEMON 1
  $.ajax({
    type: 'GET',
    url: `${BASE_API_URL}/${CONTROLLER}/${POKE_1_ID}`,
    dataType: 'json',
    success: function (pokemon) {

      pokemonsData = [];
      pokemonsData.push(pokemon[0]);
      // //console.log(pokemon);           // descomentar para ver qual é o pokemon

      // SETA INFOS POKEMON 1 NO HTML
      $('#namePoke1').text(pokemon[0].name);

      $("#typesPoke1").html('');
      pokemon[0].types.forEach(type => {
        $('#typesPoke1').append(`<span class="badge badge-pill badge-dark"> ${type} </span>`);
      });

      //$('#typesPoke1').text(print(pokemon[0].types));
      $('#votesPoke1').text(pokemon[0].votes);

      // BUSCA DADOS DO POKEMON 2
      $.ajax({
        type: 'GET',
        url: `${BASE_API_URL}/${CONTROLLER}/${POKE_2_ID}`,
        dataType: 'json',
        success: function (pokemon) {

          pokemonsData.push(pokemon[0]);
          // //console.log(pokemon);      // descomentar para ver qual é o pokemon

          // SETA INFOS POKEMON 1 NO HTML
          $('#namePoke2').text(pokemon[0].name);
          
          $("#typesPoke2").html('');
          pokemon[0].types.forEach(type => {
            $('#typesPoke2').append(`<span class="badge badge-pill badge-dark"> ${type} </span>`);
          });

          $('#votesPoke2').text(pokemon[0].votes);
        }

      });

    }
  });

  ////console.log(pokemonsData);
}

function renderPokemonsImages(POKE_1_ID, POKE_2_ID) {
  
  pokemonImg1.attr('src', `${BASE_IMG_URL}/${POKE_1_ID}.png`);
  pokemonImg2.attr('src', `${BASE_IMG_URL}/${POKE_2_ID}.png`);
}

function getRandomPokemonId () {
  ids = [];

  ids.push((Math.floor(Math.random() * (MAX - MIN + 1) + MIN)).toString());
  ids.push((Math.floor(Math.random() * (MAX - MIN + 1) + MIN)).toString());

  while( ids[0] === ids[1] ) {
    //console.log(` ids sorteados são iguais: ${ids[0]} e ${ids[1]}. sorteando de novo`);
    ids[1] = (Math.floor(Math.random() * (MAX - MIN + 1) + MIN)).toString();
  }
  
  return ids;
}

async function registerVote (votedPokemon) {

  //console.log('função registerVote()');

  //console.log(votedPokemon);

  await $.ajax({ 
    type: 'PUT',
    url: `${BASE_API_URL}/${CONTROLLER}/${votedPokemon.pokeId}`,
    dataType: 'json',
    data: votedPokemon,
    success: function (response) {
      //console.log('response: ' +JSON.stringify(response));
          
      // JÁ CHAMA MAIS DOIS POKEMONS PRA RINHA
      getPokemonsData();
    }
   });

}