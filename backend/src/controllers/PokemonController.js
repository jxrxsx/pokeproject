const mongoose = require('mongoose');
const axios = require('axios');

const Pokemon = mongoose.model('Pokemon');

mongoose.set('useFindAndModify', false);

module.exports = {
    async index (req, res) {
        const pokemon = await Pokemon.find();

        return res.json(pokemon);
    },    

    async store (req, res) {
        const pokemon = await Pokemon.create(req.body);

        return res.send();
    },

    async show (req, res) {
        const pokemon = await Pokemon.find({ pokeId: req.params.id });

        return res.json(pokemon);
    },

    async update (req, res) {
        console.log(req.params.id);

        const pokemon = await Pokemon.findOneAndUpdate({ pokeId: req.params.id }, { $inc: { votes: 1 } }, { new: true });
        console.log('atualizou os votos do pokemon' + req.params.id);
        console.log(pokemon);
        
        return res.json(pokemon);
    },

    async delete (req, res) {
        const pokemon = await Pokemon.findOneAndDelete({ pokeId: req.params.id });

        return res.send();
    },

    async ranking (req, res) {

        var limit = 26;
        const skip = (parseInt(req.query.page) - 1) * (limit);   

        const pokemon = await Pokemon.find({ }).sort({ votes: -1 }).limit( limit ).skip( skip );

        return res.json(pokemon);
    },

    async seed(req, res){
        const QTD_POKEMONS = 152;
        var pokeId, name, icon, votes;
        var types = [];
        var jsonPokemons = [];
        for(var i = 1; i < QTD_POKEMONS; i++){
            var pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokeId = pokemon.data.id;
            name = pokemon.data.name;
            icon = pokemon.data.sprites.front_default;
            types = [];
            
            pokemon.data.types.forEach(prop => {
                types.push(prop.type.name);    
            }); 

            votes = 0;

            jsonPokemons.push({ pokeId, name, icon, types, votes });

            const result = await Pokemon.create({ pokeId, name, icon, types, votes });
        }

        return res.json(jsonPokemons);
    }

};