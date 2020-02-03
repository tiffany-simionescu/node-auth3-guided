// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
// const Ussers = require('../users/users-model.js');

module.exports = (role) => {
  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
  return (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, payload) => {
      if (err) {
        res.status(403).json({
          message: "You are not authorized."
        })
      } else {
        if (role !== payload.userRole) {
          res.status(403).json({
            message: "You don't have permission for this endpoint"
          })
        } else {
          req.userId = payload.userId;
          next();
        }
      }
    })
  } else {
    res.status(400).json({
      message: "No credentials provided"
    })
  }
}
};
