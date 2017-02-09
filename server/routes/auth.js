const path = require('path');
const router = require('express').Router();
const Auth = require(path.resolve('server', 'controllers', 'login'));

router.post('/login', Auth.login)
.post('/register', Auth.register);

module.exports = router;
