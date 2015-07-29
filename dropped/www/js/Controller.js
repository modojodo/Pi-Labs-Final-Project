var app = angular.module('dropped', ['ionic', 'ngRoute']);
app.controller('registerUser',['$scope','myService','$location','$rootScope', function($scope,myService,$location,$rootScope,$state) {
   // $rootScope.location = $location.path();
    console.log("Hello World")
    $scope.username='';
    $scope.email='';
    $scope.password='';


    $scope.register = function () {
        var abc={username:$scope.username,email:$scope.email,password:$scope.password}
        console.log("IwantToRegister")
        console.log(abc);
        $scope.username='';
        $scope.email='';
        $scope.password='';
        console.log(abc);
        myService.registerUser(abc).success(function(res){

            if(res=="Used")
            {
                alert("This user has already an accout")
                $location.path('/register')
            }
            else
            {
                console.log("inElse");
                $rootScope.loggedIn=true;
                $location.path("/login");
            }
        });



    }

}]).controller('loginUser',['$scope','myService','$location',function($scope,myService,$location)
{
  //  $rootScope.location = $location.path();
    $scope.login=function()
    {
        console.log("i AM login")
        var abc={username:$scope.username,password:$scope.password};
        console.log("loggin in ka object",abc);
        myService.login(abc).success(function(res){
            console.log(res);
            if(res.error)
            {
                $location.path('/login')

            }
            else
            {
             //   $rootScope.loggedIn=true;
                $location.path('products')

            }
        });

    }
}]).controller('getBytesProductsSamsung', ['$scope', 'myService', function ($scope, myService) {
    $scope.products = [];
    myService.getBytesSamsung().success(function (res) {


        $scope.products = res;
        console.log($scope.products);
    });

}]).controller('getDetails', ['$scope', 'myService', '$routeParams', '$stateParams','$ionicHistory', function ($scope, myService, $routeParams, $stateParams,$ionicHistory) {
    $scope.id = $stateParams.id;
    console.log($stateParams);
    $scope.products;
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
        console.log("I want toGoBack")

    };
    myService.getBytesSamsungWithId($scope.id).success(function (res){

        $scope.product = res;
        console.log($scope.product);

    });

}]).controller('logOut',['$scope','myService','$location',function($scope,myService,$location)
{
    //  $rootScope.location = $location.path();
    $scope.logout=function()
    {
       console.log('LoggedOut');
        $location.path('home');

    }
}])
    .factory('myService', function ($http) {

        var ergastAPI = {};
        ergastAPI.login=function(abc)
        {
            var req = {
                method: 'POST',
                url: '/login',
                data: abc
            };
            return $http(req);
        }
        ergastAPI.registerUser=function(data)
        {
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
            templateUrl: '/partials/Products.html',
            controller: 'getBytesProductsSamsung'
        });
        $stateProvider.state('details', {
            url: '/details/:id',
            templateUrl: '/partials/single-product.html',
            controller: 'getDetails'
        });
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/partials/Login.html',
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
        $urlRouterProvider.otherwise('home');
    })
