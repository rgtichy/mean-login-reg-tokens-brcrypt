const jwt = require('jsonwebtoken');

module.exports.verify = function(request, response, next) {
  const token = request.body.token || request.query.token || request.headers['x-access-token'] || request.token || request.cookies.token;

  if(token) {
    jwt.verify(token, request.app.get('token_secret'), function(error, decoded) {
      if (error) {
        // Various ERROR types
        // TokenExpiredError => 'jwt expired',
        // JsonWebTokenError => 'jwt malformed'
        //                   => 'jwt signature is required'
        //                   => 'invalid signature'
        //                   => 'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
        //                   => 'jwt issuer invalid. expected: [OPTIONS ISSUER]'
        //                   => 'jwt id invalid. expected: [OPTIONS JWT ID]'
        //                   => 'jwt subject invalid. expected: [OPTIONS SUBJECT]'
        return next(new Error(`There was an error verifying the token: ${error}`));
      }
      request.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('no token found'));
  }
}

module.exports.sign = function(request, payload, options = { expiresIn: 100000 }, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = { expiresIn: 100000 };
  }
  jwt.sign(payload, request.app.get('token_secret'), options, function(error, token) {
    if (error) {
      console.log(error);
    }
    callback(error, token);
  });
}
