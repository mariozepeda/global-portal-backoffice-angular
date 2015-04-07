'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.university',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/university/:acronym', {
        templateUrl: 'university/university-detail.html',
        controller: 'UniversityDetailCtrl'
    }).
  	otherwise({
  		redirectTo: '/view1'
  	});
}]);
