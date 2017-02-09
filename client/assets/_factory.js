// factory for login/register
angular.module('loginApp').factory("userFactory", ["$http", function($http){
  const factory = {};
console.log("factory loaded.")
  factory.getUser = function(id,callback){
    $http.get(`/login/${id}`)
      .then(callback)
      .catch(errorHandler);
  }

  return factory;
}])

function errorHandler(error) {
  console.error(error);
}
