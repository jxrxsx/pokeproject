const express = require('express');

const routes = express.Router();

const PokemonController = require('../src/controllers/PokemonController');

routes.get('/pokemons', PokemonController.index);

routes.post('/pokemons', PokemonController.store);


routes.get('/pokemons/:id', PokemonController.show);

routes.delete('/pokemons/:id', PokemonController.delete);

routes.put('/pokemons/:id', PokemonController.update);

routes.get('/seed', PokemonController.seed);

module.exports = routes;