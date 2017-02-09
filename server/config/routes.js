var LoginController = require('../controllers/loginController');

module.exports = function(app){
    app.get("/login/:id", LoginController.show);
    app.post("/login", LoginController.login);
    app.post("/register",LoginController.create);
}
