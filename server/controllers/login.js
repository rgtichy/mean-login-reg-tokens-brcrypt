const User = require("mongoose").model('User');
const bcrypt = require('bcrypt');
const path = require('path');
const sign = require(path.resolve('server', 'modules', 'setVerifyToken')).sign;

module.exports = {
  show: function(){
    console.log("show")
  },
  register: function(request,response){
    console.log("create")
    // console.log(request.body)
    User.findOne({'email':request.body.email}).exec()
    .then(function(result){
      if (result){
        // console.log("email found, cannot register");
        response.json({success:false, message:`email ${request.body.email} already registered.`});
      }
      else{
        // console.log(`new user ${request.body.email}, proposed`)
        if (request.body.password !== request.body.password2){
          // console.log("passwords don't match, fail register");
          response.json({success: false, field: 'password2', message:`Please re-type the passwords.`});
        }
        request.body.password2 = null;
        newUser = new User;
        newUser.firstName = request.body.firstName;
        newUser.lastName = request.body.lastName;
        newUser.email = request.body.email;
        newUser.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(8))
        newUser.birthDate = Date(request.body.birthDate);
        // console.log(newUser)
        newUser.save(function(err,newUser){
          if (err){
            return response.json({success: false, message: err })
          }
          response.json({success: true})
        })
      }
    })
    .catch(function(error) {
      handleError(error, response);
    });
  },
  login: function(request,response){
    // console.log("login")
    // console.log( `User attempts login: ${request.body.email}`)
    User.findOne({'email':request.body.email}).exec()
    .then(function(user){
      // console.log('query result:',user)
      if (user){
        if(bcrypt.compareSync(request.body.password, user.password)){
          // console.log("passwords check out")
          // need to get the password out of the user Object before compacting it into the token
          user.password=null;
          //
          sign(request, user.toObject(), function(error, token) {
            if (error) return handleError(error, response);
            // console.log("respond with token")
            response.json({ 'success': true, 'token': token });
          });
        }
        else{
          // console.log(`passwords don't match... ${request.body.password} is not a good password.`)
          response.json({success:'false', error: 'username/password combination does not validate.'});
        };
      }
    })
    .catch(function(error) {
      handleError(error, response);
    });
  }
}
function handleError(error, response) {
  console.log(error)
  response.status(500).json({ success: false, message: `an error occured ${error}` });
}
