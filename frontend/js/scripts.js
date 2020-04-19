/*!
    * Start Bootstrap - Freelancer v6.0.1 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */

    $(document).ready(function(){

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

      $("#poke1, #poke2").on('click', function() {
        atualizaContador();
        renderRandomPokemons();
      });

    });

    
    (function($) {


    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
 
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
  
  })(jQuery); // End of use strict
  