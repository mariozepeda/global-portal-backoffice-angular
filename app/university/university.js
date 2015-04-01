'use strict';

var myApp = angular.module('myApp.university', ['ngRoute', 'kendo.directives'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/university', {
    templateUrl: 'university/university.html',
    controller: 'UniversityCtrl'
  });
}])

.controller('UniversityCtrl', function($scope) {

	$scope.showAlert = function(){
		alert("Que ondas?");
	}

	$scope.columns = [ {
                                field: "name",
                                width: 90,
                                title: "Nombre"
                            } , {
                                field: "language",
                                width: 90,
                                title: "Lenguaje"
                            } , {
                                field: "acronym",
                                width: 90,
                                title: "Acronimo"
                            } , {
                                field: "country",
                                width: 90,
                                title: "Pais"
                            } , {
                                field: "region",
                                width: 90,
                                title: "Region"
                            } , {
                                field: "logo",
                                width: 90,
                                title: "Logo"
                            } , {
                                field: "kind",
                                width: 90,
                                title: "Tipo"
                            } 
                        ];


	var man1 = new Man('name1', 25);
	var man2 = new Man('name2', 28);
	var man3 = new Man('name3', 21);
			    
	$scope.onSubmit = function(){
		if($scope.nameInput !== "" && $scope.ageInput !== ""){
			var myman = new Man($scope.nameInput,$scope.ageInput);
			$scope.people.push(myman);
		}
	}
			    
	$scope.people = [man1, man2, man3];


	function Man(name, age) {
		this.name = name;
		this.age = age;
	}

});

myApp.directive('kendogrid', function() {
    return {
        restrict: 'E',
        replace: true,
        scope:{source:'=source',columns:'=columns'},
        template: '<div id="kendogrid"></div>',
        link: function(scope,element,attrs) {
            element.kendoGrid({
                        dataSource: scope.source,
                        groupable: attrs.groupable,
                        sortable: attrs.sortable,
                        pageable: {
                            refresh: true,
                            pageSizes: true
                        },
                        columns: scope.columns
                    });
        }
    };
});