const bodyParser =  require('body-parser');
const express = require('express');
const connection = require('./database');
const jwt = require('./helpers/JWTfactory');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    console.log(req);
    if (typeof req.body.password !== 'undefined' && req.body.password === 'DataDog') {
        res.send({ token: jwt.create(req.body.password)});
    }
    res.status(401).send({ error: 'incorrect password' });
});