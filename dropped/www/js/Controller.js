
var app = angular.module('dropped', ['ionic', 'ngRoute','ngMessages']);
app.controller('registerUser', ['$scope', 'myService', '$location', '$rootScope', function ($scope, myService, $location, $rootScope, $state) {
    // $rootScope.location = $location.path();

    console.log("Hello World")
    $scope.username = '';
    $scope.email = '';
    $scope.password = '';




    $scope.register = function (form) {
        var abc={username:$scope.username,email:$scope.email,password:$scope.password}

        console.log("IwantToRegister")
        console.log(abc);

        console.log(abc);

        if(form.$valid){
        myService.registerUser(abc).success(function(res){



            if (res == "Used") {
                alert("This user has already an accout")
                $location.path('/register')
            }
            else {
                console.log("inElse");
                $rootScope.loggedIn = true;
                $location.path("/login");
            }
        })};


    }


}]).controller('loginUser',['$scope','myService','$location',function($scope,myService,$location)
    {
  //  $rootScope.location = $location.path();
    $scope.login=function(form) {
        console.log("i AM login")
        var userObj = {username: $scope.username, password: $scope.password};
        console.log("loggin in ka object", userObj);
        if (form.$valid) {
            myService.login(userObj).success(function (res) {
                console.log(res);
                if (res.error) {
                    alert("Error")
                    $scope.username = "";
                    $scope.password = "";
                    $location.path('login')

                }
                else {
                    //   $rootScope.loggedIn=true;
                    $location.path('products')

                }
            });
        }
    }

}]).controller('getBytesProductsSamsung', ['$scope', 'myService', function ($scope, myService) {
    $scope.products = [];
    $scope.loader=false;
    myService.getBytesSamsung().success(function (res) {
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);

    });

}]).controller('getDetails', ['$scope', 'myService', '$routeParams', '$stateParams', '$ionicHistory', function ($scope, myService, $routeParams, $stateParams, $ionicHistory) {
    $scope.id = $stateParams.id;
    $scope.loader= false;
    console.log($stateParams);
    $scope.products;
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    myService.getBytesSamsungWithId($scope.id).success(function (res) {
        $scope.product = res;
        $scope.loader=true;

        console.log($scope.product);


    });

}]).controller('logOut', ['$scope', 'myService', '$location', function ($scope, myService, $location) {
    
    $scope.logout = function () {
        
myService.logout().success(function (res) {
             
        $location.path("home");


    });
    }
}]).controller('Authentication', ['$scope', 'myService','$location', function ($scope, myService,$location) {
    console.log($scope.page);
  myService.isAuthenticated().success(function (res) {
    console.log("Authentication Called");
        if(res==true){
             $location.path('products')
        }
        else{
             $location.path('home')
        }
            

    });
}])
    .factory('myService', function ($http) {

        var ergastAPI = {};
         ergastAPI.isAuthenticated = function () {
            var req = {
                method: 'GET',
                url: '/isAuthenticated',
                
            };
            return $http(req);
        }
         ergastAPI.logout = function () {
            var req = {
                method: 'GET',
                url: '/logout',
                
            };
            return $http(req);
        }
        ergastAPI.login = function (userObj) {
            var req = {
                method: 'POST',
                url: '/login',
                data: userObj
            };
            return $http(req);
        }
        ergastAPI.registerUser = function (data) {
            var req = {
                method: 'POST',
                url: '/register',
                data: data
            };
            return $http(req);

        }

        ergastAPI.getBytesSamsung = function () {
            return getProducsServer("/getBytesSamsung");
        }
        ergastAPI.getBytesSamsungWithId = function (id) {
            //console.log("yeh id hai!",id);
            return $http({
                method: 'GET',
                url: '/getBytesSamsung/' + id
            });
        }


        function getProducsServer(URL) {
            return $http({
                method: 'GET',
                url: URL
            });
        }


        return ergastAPI;
    }).config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('products', {
            url: '/products',
             //cache:false,
            templateUrl: '/partials/products.html',
            controller: 'getBytesProductsSamsung'
        });
        $stateProvider.state('details', {
            url: '/details/:id',
           //  cache:false,
            templateUrl: '/partials/single-product.html',
            controller: 'getDetails'
        });
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            controller: "loginUser"

        });
        $stateProvider.state('index', {
            url: '/index',
            templateUrl: '/index.html',


        });
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/partials/register.html',
            controller: "registerUser"

        });
        $stateProvider.state('home', {
            url: '/home',

            templateUrl: '/partials/home.html',

        });
        $stateProvider.state('logout', {
            url: '/logout',
            templateUrl: '/partials/home.html',
            controller: "logOut"

        });
        $stateProvider.state('isAuthenticated', {
            url: '/',
            cache:false,
            controller: "Authentication"


        });
        $urlRouterProvider.otherwise('isAuthenticated');

    });
