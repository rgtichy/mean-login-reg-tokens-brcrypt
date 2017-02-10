// login and registration controllers
angular.module("loginApp").controller("loginController", ["$scope", "$routeParams", "$location", "$route", "userFactory", "UserService",
    function($scope, $routeParams, $location, $route, userFactory, UserService){
      console.log("lC loaded")

      $scope.user = {};

      $scope.login = function(){
        UserService.login($scope.user)
        .then(function(res){
          if (res.data.success){
            $location.url('/app')
          }
        })
        .catch(function(res){
          console.log(res)
        })
      }

    }]);
angular.module("loginApp").controller("registerController", ["$scope", "$routeParams", "$location", "$route", "userFactory", "UserService",
  function( $scope, $routeParams, $location, $route, userFactory, UserService ){
    console.log("rC loaded")
    $scope.reg = function(){
      console.log($scope.user)
      UserService.register($scope.user)
      .then(function(res){
        if (res.data.success){
          $location.url('/login');
        }
      })
      .catch(function(res){
        console.log(res)
      })
    }
  }]);
angular.module("loginApp").controller("appController",["$scope", "$routeParams", "$location", "$route", "userFactory", "UserService", "AuthService",
  function( $scope, $routeParams, $location, $route, userFactory, UserService, AuthService ){
    console.log("appController loaded")

    if (!AuthService.isAuthed()){
      $location.url("/login");
    }

    $scope.logout = function(){
      AuthService.logout();
      $location.url('/login')
    }
  }]);
