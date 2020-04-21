const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    votes: {
        type: Number
    }
});

mongoose.model('Pokemon', PokemonSchema);