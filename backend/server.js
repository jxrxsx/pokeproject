const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciado o APP
const app = express();

// Iniciando o DB
mongoose.connect("mongodb://localhost:27017/pokedb", { useNewUrlParser: true, useUnifiedTopology: true });

requireDir('./src/models');

var Schema = mongoose.Schema;

const Pokemon = mongoose.model('Pokemon');

app.get('/', (req, res) => {

    Pokemon.create({
        votes: 2,
    });

    res.json({ 
        "nome": "jonzera",
        "idade": 22,
        "skills": {
            "web": ["nodejs", "ASP.NET", "SpringBoot"]
        }
    });
});

app.listen(3000);