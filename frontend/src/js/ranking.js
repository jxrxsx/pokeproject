const NODE_API_DEV_ENV = 'http://localhost:3000/api'; 
const NODE_API_PROD_ENV = 'https://pokerinha.herokuapp.com/api';

const BASE_API_URL = NODE_API_PROD_ENV; 

const ACTION = 'ranking';

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: `${BASE_API_URL}/${ACTION}`,
        dataType: 'json',
        success: (ranking) => {
            console.log('ranking dos pokemons: ');
            console.log(ranking);

            // EXIBE TODOS OSP POKEMONS DA PAGINA 1
            showRankingByPage(ranking);
        }
    });



});

function showRankingByPage(ranking) {
    
    $("#linha").html('');
    for (let i = 0; i < ranking.length; i++) {
        $("#linha").append(
            ` 
                <div id="pokeCard" class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="card-horizontal">
                            <div class="card-body">
                                <span id="rank-${i + 1}" class="badge badge-pill badge-primary"> ${i + 1} </span>
                                <div id="votesPoke-${i + 1}">
                                   <strong> votes: </strong>
                                   <span class="badge badge-pill badge-light"> ${ranking[i].votes} </span>
                                </div>
                                <h5 id="namePoke-${i + 1}" class="card-title text-uppercase"> ${ranking[i].name} </h5>
                            </div>
                    
                            <div class="img-square-wrapper">
                                <img id="icon-${i + 1}" class="" src="${ranking[i].icon}" />
                            </div>
                        </div>
                    </div>
                </div> `
        );
    }
    
    $("#linha").append(`<div id="pokeCard" class="col-lg-5 col-md-5 col-sm-12 col-xs-12"></div>`);

}


$(".page-item").click( function () {
    const PAGE = this.id;
    console.log(PAGE);

    $.ajax({
        type: 'GET',
        url: `${BASE_API_URL}/${ACTION}?${PAGE}`,
        dataType: 'json',
        success: (ranking) => {
            showRankingByPage(ranking);
        }
    });
});