const express = require('express');

const app = express();

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