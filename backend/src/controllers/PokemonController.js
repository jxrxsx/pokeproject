const mongoose = require('mongoose');
const axios = require('axios');

const Pokemon = mongoose.model('Pokemon');

module.exports = {
    async index(req, res) {
        const pokemon = await Pokemon.find();

        return res.json(pokemon);
    },    

    async store(req, res) {
        const pokemon = await Pokemon.create(req.body);

        return res.json(pokemon);
    },

    async show(req, res) {
        const pokemon = await Pokemon.findById(req.params.id);

        return res.json(pokemon);
    },

    async update(req, res) {
        const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        return res.json(pokemon);
    },

    async delete(req, res) {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

        return res.send();
    },

    async seed(req, res){
        //const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        //const pokemons = response.data.results;
        const limit = 151;
        var id, name, icon, types, votes;
        //for(var i = 0; i < limit; i++){
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
            
           //var schema = new mongoose.Schema({ name: 'string', size: 'string' });
            
            const Pokemon = mongoose.model('Pokemon', schema);
            id = pokemon.data.id;
            name = pokemon.data.name;
            icon = pokemon.data.sprites.front_default;
            
            pokemon.data.types.forEach(t => {
                types.push(t.type.name);    
            }); 

            votes = 0;

            //const result = await Pokemon.create({ pokeId, name, icon: sprites.front_default, types: types.type.name, votes: 0  });
        //}

        return res.send(pokemon.data);
    }

};