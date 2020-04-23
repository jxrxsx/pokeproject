const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

// Iniciado o APP
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect("mongodb://localhost:27017/pokedb", { useNewUrlParser: true, useUnifiedTopology: true });

requireDir('./src/models');

var Schema = mongoose.Schema;

//const Pokemon = mongoose.model('Pokemon');

app.use('/api', require('./src/routes'));

app.listen(3000);