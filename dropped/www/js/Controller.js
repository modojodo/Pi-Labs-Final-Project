var objects={};
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
                    $location.path('watchproducts')

                }
            });
        }
    }
   // Registers a device for push notifications and stores its token
     // Handles incoming device tokens
  
  
  
}]).controller('getProductsController', ['$scope', 'myService','$location', function ($scope, myService,$location) {
    $scope.products = [];
    $scope.loader=false;
    var obj={};
    $scope.BytesSamsung=function()
    {
        
        var obj={name : "Bytessamsungcollection"};
    myService.getProducts(obj).success(function (res) {
        objects=res;
        $scope.products = res;
        
        console.log("I am Called")
        console.log($scope.products);
        $location.path('products');

    });
    console.log("Yaha");

}

    $scope.BytesQmobile=function()
    {
        var obj={name : "Bytesqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
        $location.path('products')

        console.log($scope.products);

    });
}
    $scope.BytesApple=function(){
        var obj={name : "Bytesapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
    $scope.BytesHTC=function(){
        var obj={name : "Byteshtccollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.BytesLG=function(){
        var obj={name : "Byteslgcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.BytesMICROSOFT=function(){
        var obj={name : "Bytesmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.BytesMOTOROLA=function(){
        var obj={name : "Bytesmotorolacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.BytesNOKIA=function(){
        var obj={name : "Bytesnokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.BytesSONY=function(){
        var obj={name : "Bytessonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
    $scope.DarazSamsung=function(){
        var obj={name : "Darazsamsungcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
   
  $scope.DarazQmobile=function(){
        var obj={name : "Darazqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
    $scope.DarazApple=function(){
        var obj={name : "Darazapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
    $scope.DarazMICROSOFT=function(){
        var obj={name : "Darazmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.DarazNOKIA=function(){
        var obj={name : "Daraznokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}
$scope.DarazSONY=function(){
        var obj={name : "Darazsonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });
}

   $scope.HomeshoppingSamsung=function(){
        var obj={name : "Homeshoppingsamsungcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
    $location.path('products')
        console.log($scope.products);

    });

}
   
  $scope.HomeshoppingQmobile=function(){
        var obj={name : "Homeshoppingqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });

}
    $scope.HomeshoppingApple=function(){
        var obj={name : "Homeshoppingapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });

}
    $scope.HomeshoppingHTC=function(){
        var obj={name : "Homeshoppinghtccollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
$location.path('products')

    });

}
$scope.HomeshoppingSONY=function(){
        var obj={name : "Homeshoppingsonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$location.path('products')
        console.log($scope.products);

    });

}
$scope.HomeshoppingMICROSOFT=function(){
        var obj={name : "Homeshoppingmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
       $location.path('products')

    });

}
$scope.HomeshoppingMOTOROLA=function(){
        var obj={name : "Homeshoppingmotorollacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
    $location.path('products')

    });

}
$scope.HomeshoppingLG=function(){
        var obj={name : "Homeshoppinglgcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
 $location.path('products')

    });

}
$scope.HomeshoppingNOKIA=function(){
        var obj={name : "Homeshoppingnokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
$location.path('products')

    });

}



console.log("Show",objects)
$scope.products=objects;
$scope.loader=true;
}]).controller('getProductsController1', ['$scope', 'myService','$state', function ($scope, myService,$state) {
    $scope.products = [];
    $scope.loader=false;
    var obj={};
    $scope.BytesSamsung=function()
    {
        
        var obj={name : "Bytessamsungcollection"};
    myService.getProducts(obj).success(function (res) {
        objects=res;
        $scope.products = res;
        
        console.log("I am Called")
        console.log($scope.products);
       $state.go($state.current, {}, {reload: true});

    });
    console.log("Yaha");

}

    $scope.BytesQmobile=function()
    {
        var obj={name : "Bytesqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
     $state.go($state.current, {}, {reload: true});

        console.log($scope.products);

    });
}
    $scope.BytesApple=function(){
        var obj={name : "Bytesapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
    $scope.BytesHTC=function(){
        var obj={name : "Byteshtccollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.BytesLG=function(){
        var obj={name : "Byteslgcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.BytesMICROSOFT=function(){
        var obj={name : "Bytesmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.BytesMOTOROLA=function(){
        var obj={name : "Bytesmotorolacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.BytesNOKIA=function(){
        var obj={name : "Bytesnokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.BytesSONY=function(){
        var obj={name : "Bytessonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
    $scope.DarazSamsung=function(){
        var obj={name : "Darazsamsungcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
   
  $scope.DarazQmobile=function(){
        var obj={name : "Darazqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
    $scope.DarazApple=function(){
        var obj={name : "Darazapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
    $scope.DarazMICROSOFT=function(){
        var obj={name : "Darazmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.DarazNOKIA=function(){
        var obj={name : "Daraznokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}
$scope.DarazSONY=function(){
        var obj={name : "Darazsonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });
}

   $scope.HomeshoppingSamsung=function(){
        var obj={name : "Homeshoppingsamsungcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
   $state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });

}
   
  $scope.HomeshoppingQmobile=function(){
        var obj={name : "Homeshoppingqmobilecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });

}
    $scope.HomeshoppingApple=function(){
        var obj={name : "Homeshoppingapplecollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });

}
    $scope.HomeshoppingHTC=function(){
        var obj={name : "Homeshoppinghtccollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
$state.go($state.current, {}, {reload: true});

    });

}
$scope.HomeshoppingSONY=function(){
        var obj={name : "Homeshoppingsonycollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;
$state.go($state.current, {}, {reload: true});
        console.log($scope.products);

    });

}
$scope.HomeshoppingMICROSOFT=function(){
        var obj={name : "Homeshoppingmicrosoftcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
        $state.go($state.current, {}, {reload: true});

    });

}
$scope.HomeshoppingMOTOROLA=function(){
        var obj={name : "Homeshoppingmotorollacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
        $state.go($state.current, {}, {reload: true});

    });

}
$scope.HomeshoppingLG=function(){
        var obj={name : "Homeshoppinglgcollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
        $state.go($state.current, {}, {reload: true});

    });

}
$scope.HomeshoppingNOKIA=function(){
        var obj={name : "Homeshoppingnokiacollection"};
    myService.getProducts(obj).success(function (res) {
         objects=res;
        $scope.products = res;
        $scope.loader=true;

        console.log($scope.products);
        $state.go($state.current, {}, {reload: true});

    });

}



console.log("Show",objects)
$scope.products=objects;
$scope.loader=true;
}]).controller('ContentController', ['$scope','$ionicSideMenuDelegate', function ($scope,$ionicSideMenuDelegate ) {
      $scope.submenu=false;
   $scope.submenuhome=false;
    $scope.submenudaraz=false;
    $scope.submenubytes=false;
$scope.toggleLeft = function() {
      console.log("Button called")
    $ionicSideMenuDelegate.toggleLeft();
  
   $scope.submenu=false;
   $scope.submenuhome=false;
    $scope.submenudaraz=false;
    $scope.submenubytes=false;
  };

   $scope.showsub= function(){
    $scope.submenu=true;
    
  }
  $scope.showsubhome = function(){
    $scope.submenu=true;
    $scope.submenuhome=true;
    $scope.submenudaraz=false;
    $scope.submenubytes=false;
  }
  $scope.showsubdaraz = function(){
     $scope.submenu=true;
    $scope.submenudaraz=true;
    $scope.submenubytes=false;
      $scope.submenuhome=false;
  }
   
   $scope.showsubbytes = function(){
     $scope.submenu=true;
    $scope.submenubytes=true;
    $scope.submenudaraz=false;
     $scope.submenuhome=false;
  }
   
   
   
   

}]).controller('getDetails', ['$scope', 'myService', '$routeParams', '$stateParams',  '$location',function ($scope, myService, $routeParams, $stateParams,$location
    ) {
    $scope.id = $stateParams.id;
    $scope.loader= false;
    console.log($stateParams);
   

    $scope.SendDetails = function(Product){
        console.log(Product);

        
        myService.watchProduct(Product).success(function (res) {
            if(res==true){
                alert("Your Product add for a watch !");
                $location.path("watchproducts");
            }

    });

    };

   
    myService.getProductsWithId($scope.id).success(function (res) {
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
             $location.path('watchproducts')
        }
        else{
             $location.path('home')
        }
            

    });
}]).controller('WatchShow', ['$scope', 'myService', function ($scope, myService) {
    $scope.products = [];
    $scope.loader=false;
     $scope.boring=false;
    var c=0;
    $scope.boring=true;
    myService.watchShow().success(function (res) {
        if(res){
        $scope.products = res;
        $scope.loader=true;
        $scope.boring=false;
        for(var i in res){
            c++;
        }
        for(var i=0;i<c;i++){
            console.log("Alert k liye check kerraha hai");
            if(res[i].productPrice != res[i].newProductPrice){
                alert("              Hurrah !\n       Price of the Product \n "+res[i].productName+"\n       Has Been Changed From\n        "+res[i].productPrice+" To "+res[i].newProductPrice);
            }


        }

        
        console.log($scope.products);
    }
   
    });
       

}]).controller('getWatchDetails', ['$scope', 'myService', '$stateParams', '$state',function ($scope, myService, $stateParams,$state
    ) {
    $scope.id = $stateParams.id;
    $scope.loader= false;
    console.log($stateParams);
   
         
    myService.getSingleWatched($scope.id).success(function (res) {
        $scope.product = res;
        $scope.loader=true;

        console.log($scope.product);


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
        ergastAPI.watchProduct = function (userObj) {
            var req = {
                method: 'POST',
                url: '/watchProduct',
                data: userObj
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

        ergastAPI.getProducts= function (obj) {
            return getProducsServer("/getProducts",obj);
        }
         ergastAPI.watchShow= function () {
            return getWatchProductsFromServer('/getWatchProducts');
        }
        ergastAPI.getSingleWatched = function (id) {
            //console.log("yeh id hai!",id);
            return $http({
                method: 'GET',
                url: '/getWatchProducts/' + id
            });
        }

        ergastAPI.getProductsWithId = function (id) {
            //console.log("yeh id hai!",id);
            return $http({
                method: 'GET',
                url: '/getProducts/' + id
            });
        }

        function getWatchProductsFromServer(URL) {

            return $http({
                method: 'GET',
                url: URL
            });
        }
        function getProducsServer(URL,UserObj) {
            return $http({
                method: 'POST',
                url: URL,
                data : UserObj
            });
        }


        return ergastAPI;
    }).config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('products', {
            url: '/products',
             cache:false,
            templateUrl: '/partials/products.html',
            controller: 'getProductsController'
        });

        $stateProvider.state('watchproducts', {
            url: '/watchproducts',
             cache:false,
            templateUrl: '/partials/Watch_Products.html',
            controller: 'WatchShow'
        });
        $stateProvider.state('details', {
            url: '/details/:id',
             cache:false,
            templateUrl: '/partials/single-product.html',
            controller: 'getDetails'
        });
        $stateProvider.state('watchdetails', {
            url: '/watchdetails/:id',
             cache:false,
            templateUrl: '/partials/Single_Watch_Product.html',
            controller: 'getWatchDetails'
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
          $stateProvider.state('stores', {
            url: '/stores',
            templateUrl: '/partials/store-categories.html',
          

        });
        $stateProvider.state('isAuthenticated', {
            url: '/',
            cache:false,
            controller: "Authentication"


        });
        $stateProvider.state('ContentController', {
            url: '/',
            cache:false,
            controller: "ContentController"


        });
         $stateProvider.state('myhome', {
            url: '/myhome',
            cache:false,
         templateUrl: '/partials/myhome.html'


        });
        $urlRouterProvider.otherwise('isAuthenticated');

    });