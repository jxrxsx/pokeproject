const express = require('express');

const app = express();

var lista1 = ["abc", "bca", "cab"];
var lista2 = ['xyz', 'zyx', 'yzx'];

var result = [...lista1, ...lista2];
console.log(result);

var json = { 
    "nome": "jonzera b.o da ZL",
    "idade": 22,
    "skills": {
        "web": ["nodejs", "ASP.NET", "SpringBoot"]
    }
}

function printJson({ nome, ...resto }){
    console.log(nome, resto);
}

printJson(json);



app.get('/', (req, res) => {
    res.json({ 
        "nome": "jonzera b.o da ZL",
        "idade": 22,
        "skills": {
            "web": ["nodejs", "ASP.NET", "SpringBoot"]
        }
    });
});

app.listen(3000);