const BASE_API_URL = 'http://localhost:3000/api';

const ACTION = 'ranking';

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: `${BASE_API_URL}/${ACTION}`,
        dataType: 'json',
        success: function (ranking) {
            console.log('ranking dos pokemons: ');
            console.log(ranking);

            // ranking.forEach(pokemon => {
            for( let i = 0; i < ranking.length; i++) {
                $("#linha").append(
                    ` 
                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="card-horizontal">
                                <div class="card-body">
                                    <span id="rank-${i+1}" class="badge badge-pill badge-primary"> ${i+1} </span>
                                    <div id="votesPoke-${i+1}">
                                       <strong> votes: </strong>
                                       <span class="badge badge-pill badge-light"> ${ranking[i].votes} </span>
                                    </div>
                                    <h5 id="namePoke-${i+1}" class="card-title text-uppercase"> ${ranking[i].name} </h5>
                                </div>
                        
                                <div class="img-square-wrapper">
                                    <img id="icon-${i+1}" class="" src="${ranking[i].icon}" />
                                </div>
                            </div>
                        </div>
                    </div> `
                );
            }
        }
    });



});
