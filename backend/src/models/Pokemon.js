const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    pokeId: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    icon: {
        type: String,
        required: true
    },

    types: {
        type: Array,
        required: true
    },

    votes: {
        type: Number,
        required: true
    },
    
});

mongoose.model('Pokemon', PokemonSchema);