const fetch = require('node-fetch');
const btoa = require('btoa');

const randomUserUrl = 'https://randomuser.me/api';

module.exports = (req, res, next) => {
  if (req.method == 'POST' && req.path == '/api/login') {
    if (req.body.username === 'admin@accedia.com' && req.body.password === 'admin') {
      fetch(randomUserUrl)
        .then(resp => resp.json())
        .then(body => res.status(200).json({
          user: body.results[0],
          token: btoa(new Date().getTime())
        }));
    } else {
      res.status(400).json({
        message: 'wrong password', 
        detail: 'wrongPassword'
      })
    }
  } else if (req.method != 'GET'){
    res.status(403).json({});
  } else if (req.headers && req.headers.authorization) {
    next();
  } else {
    res.status(401).json({});
  }
}
