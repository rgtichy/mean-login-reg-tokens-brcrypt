// main
var loginApp = angular.module("loginApp", ["ngRoute","ngMessages"])
  .config([ '$httpProvider', "$routeProvider" , function( $httpProvider, $routeProvider ){
    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
    .when('/', {
      controller : "loginController",
      templateUrl : "partials/_login.html",
    })
    .when('/login', {
        controller : "loginController",
        templateUrl : "partials/_login.html",
    })
    .when('/login/:id', {
      controller : "loginController",
      templateUrl : "partials/_profile.html",
    })
    .when('/register', {
      controller : "registerController",
      templateUrl : "partials/_register.html",
    })
    .when('/app',{
      controller : "appController",
      templateUrl : "partials/_loggedin.html",      
    })
    .otherwise({
      redirectTo : '/',
    })
  }])
