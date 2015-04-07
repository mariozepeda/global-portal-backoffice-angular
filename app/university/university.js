'use strict';

var myApp = angular.module('myApp.university', ['ngRoute', 'kendo.directives'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/university', {
    templateUrl: 'university/university.html',
    controller: 'UniversityCtrl'
  });
}])

.controller('UniversityCtrl', function($scope, $http) {
    //var university1 = new University('Unitec', 'es', 'UNITEC', 'Honduras', 'CA', 'logo.jpg', 'kind');
    //var university2 = new University('Unitec', 'es', 'UNITEC', 'Honduras', 'CA', 'logo.jpg', 'kind');
    //var university3 = new University('Unitec', 'es', 'UNITEC', 'Honduras', 'CA', 'logo.jpg', 'kind');
    //$scope.universities = new kendo.data.ObservableArray([university1, university2, university3]);

    kendo.ui.progress($("#kendogrid"), true);

    $scope.universities = new kendo.data.ObservableArray([]);
    $http.get('https://master-dot-api-dot-qa-liugateway.appspot.com/_ah/api/global/v1/collections/universities?language=es').success(function(data) {
            //$scope.phones = data;
            $scope.universities = data.items;

            //alert(data.items[1].name);
            var myUniversities = new Array(data.items);
            for (var myUniversity in myUniversities){
              //console.log(data.items[1].name);
                console.log(myUniversity.name);
            }

            kendo.ui.progress($("#kendogrid"), false);
            
        });

	$scope.showAlert = function(){
		//alert("Que ondas?");
        


        //var myUniversity = new University('Unitec', 'es', 'UNITEC', 'Honduras', 'CA', 'logo.jpg', 'kind');

        //$scope.universities.push({ name: $scope.name, country: $scope.country });
        //console.log(myUniversity);
        //$scope.universities.push(myUniversity);
        //console.log($scope.universities);
        //$scope.grid.refresh();
	}

	$scope.columns = [ {
                                field: "logo",
                                width: 90,
                                title: "Logo",
                                template: "<img src='#= logo #' 'alt='University Logo' width='100' height='42'>"
                            } ,{
                                field: "name",
                                width: 90,
                                title: "Nombre",
                                template: "<a href='./\\#/university/#= acronym #'>#= name #</a>"
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
                            } ,  {
                                field: "kind",
                                width: 90,
                                title: "Tipo"
                            } 
                        ];


	
	/*		    
	$scope.onSubmit = function(){
		if($scope.nameInput !== "" && $scope.ageInput !== ""){
			var myman = new University($scope.nameInput,$scope.ageInput);
			$scope.people.push(myman);
		}
	}
    */
			    
	//$scope.universities = [university1, university2, university3];
    
/*
      $scope.add = function () {
        $scope.people.push({ name: $scope.name, country: $scope.country });
      };*/

	function University(name, language, acronym, country, region, logo, kind) {
		this.name = name;
        this.language= language;
        this.acronym = acronym;
        this.country = country;
        this.region = region;
        this.logo = logo;
        this.kind = kind;
	}

});


myApp.controller('UniversityDetailCtrl', function($scope, $http, $routeParams) {
    $http.get('https://master-dot-api-dot-qa-liugateway.appspot.com/_ah/api/ferris/v1/collections/universities/'+$routeParams.acronym).success(function(data) {
            //$scope.phones = data;
            //$scope.universities = data.items;

            //alert(data.items[1].name);
            //var myUniversities = new Array(data.items);
            //for (var myUniversity in myUniversities){
              //console.log(data.items[1].name);
                //console.log(data);
                $scope.name = data.name;
                $scope.description = data.description.english;
                $scope.institutional_website = data.institutional_website;

                var myLogo;
                var logos = data.logo;
                //console.log(logos);

                $.each(logos, function(index, value){
                    //console.log(value.type);
                    if (value.type == "color"){
                        $scope.myLogo = value.serving_url;
                    }

                });

/*
                for(var logo in logos){
                    
                    if (logo.type == "color"){
                        myLogo = logo.servig_url;
                    }



                }
                */



                 //= myLogo;
            //}

            //kendo.ui.progress($("#kendogrid"), false);
            
    });
    

});

myApp.directive('kendogrid', function() {
    return {
        restrict: 'E',
        replace: true,
        scope:{source:'=source',columns:'=columns'},
        template: '<div id="kendogrid"></div>',
        link: function(scope,element,attrs) {
            element.kendoGrid({
                        dataSource: {data: scope.source, pageSize: 5 },
                        pageable: {
                            refresh: true,
                            pageSizes: true
                        },
                        scrollable: true,
                        height: 500,
                        //sortable: attrs.sortable,
                        columns: scope.columns
                    });
        }
    };
});