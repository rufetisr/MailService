const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role // e.g., 'admin' or 'user'
    };
    const secretKey = 'your_jwt_secret_key';
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secretKey, options); // generate token
}

module.exports = generateToken;
