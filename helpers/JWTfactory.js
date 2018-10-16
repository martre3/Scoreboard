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
