const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

// Iniciado o APP
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/pokedb', { useNewUrlParser: true, useUnifiedTopology: true });

requireDir('./models');

// var Schema = mongoose.Schema;

//const Pokemon = mongoose.model('Pokemon');

app.use('/api', require('./routes'));

app.listen(process.env.PORT || 3000);