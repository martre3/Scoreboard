require('dotenv').load();

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('./helpers/JWTfactory');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const db = require('../models/index');
const path = require('path');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/api/auth/*', async (req, res, next) => {
  try {
    if (typeof req.header('jwt') !== 'undefined') {
      const decodedData = await jwt.verify(req.header('jwt'));
      if (decodedData.data === 'DataD0g') {
        next();
      } else {
        throw "Invalid token";
      }
    } else {
      throw "Unauthenticated";
    }
  } catch (e) {
    res.status(401).json({error: e});
  }
});

app.post('/api/login', (req, res) => {
  if (typeof req.body.password !== 'undefined' && req.body.password === 'DataD0g') {
    res.json({token: jwt.create(req.body.password)});
  } else {
    res.status(401).send({error: 'incorrect password'});
  }
});

app.get('/api/results', async (req, res) => {
  const results = await db.Result.findAll();
  res.json(results);
});

app.post('/api/results/leaders', async (req, res) => {
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

app.post('/api/auth/results', async (req, res) => {
  try {
    if (typeof req.body.time === 'undefined' || req.body.time.length === 0) {
      throw "time cannot be empty";
    }

    const date = new Date();
    date.setTime(0);
    const parts = req.body.time.split(":");

    if (parts.length !== 2) {
      throw "incorrect format. Use mm:ss.ms";
    }

    const secondParts = parts[1].split(".");

    date.setMinutes(parts[0]);
    date.setSeconds(secondParts[0]);

    if (typeof secondParts[1] !== 'undefined') {
      date.setMilliseconds(secondParts[1]);
    }

    const result = db.Result.build({
      name: req.body.name,
      time: date
    });

    const resData = await result.save();
    res.json({result: resData});
  } catch (e) {
    res.status(400).json({error: e});
  }
});

app.post('/api/auth/remove', async (req, res) => {
  try {
    if (typeof req.body.id === 'undefined') {
      throw "id is required";
    }
    const result = await db.Result.destroy({
      where: {
        id: req.body.id
      }
    });

    //await result.destroy();
    res.json({success: 'success'});
  } catch (e) {
    console.log(e);
    res.status(400).json({error: e});
  }
});

app.post('/api/results/page', async (req, res) => {
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
    res.status(400).json({error: e});
  }
});

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve('/app/client/build');
  app.use(express.static(buildPath));

  app.get('*', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
