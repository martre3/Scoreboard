const jwt = require('jsonwebtoken');

exports.create = (alias) => {
  return jwt.sign(
      {
          data: alias,
      },
      'secret',
      {
          expiresIn: 840000,
          algorithm: 'HS256',
      });
};

exports.verify = (token) => {
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, 'secret', (err, decodedToken) =>
    {
      if (err || !decodedToken)
      {
        return reject(err);
      }

      resolve(decodedToken);
    })
  })
};
