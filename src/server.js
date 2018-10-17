const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('./helpers/JWTfactory');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const Result = require('./models/Result');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/login', (req, res) => {
  if (typeof req.body.password !== 'undefined' && req.body.password === 'DataDog') {
    res.json({token: jwt.create(req.body.password)});
  } else {
    res.status(401).send({error: 'incorrect password'});
  }
});

app.get('/results', async (req, res) => {
  const results = await Result.findAll();
  res.json(results);
});

app.post('/results', async (req, res) => {
  try {
    console.log(req.body);
    const result = Result.build({
      name: req.body.name,
      time: req.body.time
    });

    const resData = await result.save();
    res.json({result: resData});
  } catch (e) {
    res.status(400).json({error: e.original});
  }
});

