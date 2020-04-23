const mongoose = require('mongoose');

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
};