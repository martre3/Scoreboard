const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('./helpers/JWTfactory');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const db = require('../models/index');

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
  const results = await db.Result.findAll();
  res.json(results);
});

app.post('/results/leaders', async (req, res) => {
  const results = await db.Result.findAll({
    limit: 10,
    order: [
      ['time', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  });
  res.json(
    {
      data: results
    });
});

app.post('/results', async (req, res) => {
  try {

    const date = new Date();
    date.setTime(0);
    const parts = req.body.time.split(":");
    const secondParts = parts[1].split(".");

    date.setMinutes(parts[0]);
    date.setSeconds(secondParts[0]);

    console.log(secondParts);
    if (typeof secondParts[1] !== 'undefined') {
      date.setMilliseconds(secondParts[1]);
    }

    console.log(date);
    const result = db.Result.build({
      name: req.body.name,
      time: date
    });

    console.log(result);
    const resData = await result.save();
    console.log(resData);
    res.json({result: resData});
  } catch (e) {
    res.status(400).json({error: e.original});
  }
});

app.post('/results/page', async (req, res) => {
  try {
    const results = await db.Result.findAll({
      offset: req.body.itemsPerPage * req.body.page,
      limit: parseInt(req.body.itemsPerPage),
      order: [
        ['time', 'ASC'],
        ['createdAt', 'ASC'],
      ],
    });

    const all = await db.Result.findAll();

    res.json({
      data: results,
      total: all.length,
    });
  } catch (e) {
    res.status(400).json({error: e.original});
  }
});

