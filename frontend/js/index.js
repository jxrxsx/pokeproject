$(document).ready(function(){


    getPokemonData();

    function print(types){
        var string = "";
        types.forEach(type => {
            string.concat(type);
        });

        return string;
    }
    
    function getPokemonData(){ 
        var pokemons = [];

        $.ajax({
            type: 'GET', 
            url: 'http://localhost:3000/api/pokemons',
            dataType: 'json',
            success: function(data){
                
                data.forEach(pokemon => {
                    pokemons.push(pokemon);
                });

                // INFOS POKEMON 1
                $("#namePoke1").text(pokemons[0].name);
                $("#typesPoke1").text(pokemons[0].types);
                $("#votesPoke1").text(pokemons[0].votes);


                // INFOS POKEMON 2
                $("#namePoke2").text(pokemons[1].name);
                $("#typesPoke2").text(pokemons[1].types);
                $("#votesPoke2").text(pokemons[1].votes);
                
            }
        });
    }
        
    const pokemonImg1 = $('#poke1');
    const pokemonImg2 = $('#poke2');
    var count = 0;
    const min = 1;
    const max = 152;

    renderRandomPokemons();

    function renderRandomPokemons(){
      
      const baseUrl = 'https://pokeres.bastionbot.org/images/pokemon/';
      
      pokemonImg1.attr('src', baseUrl+getRandomPokemon()+'.png');
      pokemonImg2.attr('src', baseUrl+getRandomPokemon()+'.png');
      
    }

    function atualizaContador(){
      count += 1;
      localStorage.setItem("contador", count);
    }

    function getRandomPokemon(){
      return (Math.round(Math.random() * (max - min) + min)).toString();
    }

    $('#btnRecarregar').click(async () =>{
      pokemonImg1.src = await renderRandomPokemons();
      pokemonImg2.src = await renderRandomPokemons();
    });

    $('#poke1, #poke2').on('click', function() {
      atualizaContador();
      renderRandomPokemons();
    });

    $('#nomePoke1').text()


  });