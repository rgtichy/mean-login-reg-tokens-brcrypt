angular.module('loginApp').service('AuthService',['$window',
  function($window) {
    const self = this;

    self.parseJWT = function(token) {
      const base64URL = token.split('.')[1];
      const base64 = base64URL.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    };

    self.saveToken = function(token) {
      $window.localStorage.jwtToken = token;
    };

    self.getToken = function() {
      return $window.localStorage.jwtToken;
    };

    self.isAuthed = function() {
      const token = self.getToken();

      if (!token) return false;

      const params = self.parseJWT(token);

      console.log(params);

      return Math.round(new Date().getTime() / 1000) <= params.exp;
    };

    self.logout = function() {
      $window.localStorage.removeItem('jwtToken');
    };
  }]
);
angular.module('loginApp').service('UserService',['$http',
  function($http) {
    const self = this;

    self.register = function(user) {
      return $http.post('/auth/register', user);
    };

    self.login = function(user) {
      return $http.post('/auth/login', user);
    };
    self.logout = function(){
      return $http.get('/logout');      
    }
  }]
);
