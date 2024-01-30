const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send('Unauthorized User: Missing token');
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Unauthorized User: Invalid token');
      }
      req.userId = decoded.userId;
      next();
    });
  };

  module.exports = authenticateUser;