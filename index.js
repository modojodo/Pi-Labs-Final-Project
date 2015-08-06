var exports = module.exports = {};
var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
var port = process.env.PORT || 3030;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Stores=["Bytessamsungcollection","Bytesapplecollection","Bytesqmobilecollection","Byteshtccollection","Homeshoppingsamsungcollection","Homeshoppingapplecollection","Homeshoppingqmobilecollection","Homeshoppinghtccollection","Darazsamsungcollection","Darazapplecollection","Darazqmobilecollection"]
var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');
var counter=0;
var async = require("async");

//Requiring the crawler scripts

var bytes= require('./bytes.js');
var homeshopping = require('./home-shopping.js')
var daraz = require('./daraz.js')
fetchData();
setInterval(fetchData(),43200000);
if(counter>0){


setInterval(CheckPrice(),42900000);
}




var temp=[];
var co=0;

function CheckPrice(){

    var array=[];
    temp=null;
    temp=[];
    console.log("chalraha hai")
    var Usercollection=db.get("Watch_Products_Collection");
     Usercollection.findOne({userid: MatchUser}, {}, function (e, docs) {
        if (docs) {
                    for(var i in docs.UserProduct){
                               
                     co++
                }
                for(var k=0;k<co;k++){
                    for(var j=0;j<Stores.length;j++){
                            array=some(Stores[j],docs,k,array);
                        }
                }
                
             
        }
        else{
            console.log("nhe")
        }
     });
            return 5;


}
function some(kuchaya,docs,k,array,a){
     var collection=db.get(kuchaya);
                        var asd=k;
                        if(docs.UserProduct[k]!=null){
                        collection.findOne({productLink: docs.UserProduct[k].productLink}, {}, function (e, docs1) {
                            if(docs1){
                                if(docs.UserProduct[asd].productPrice != docs1.productPrice){
                                    console.log("Price change hua hai",docs.UserProduct[asd].productPrice,"    TO this",docs1.productPrice);
                                      FreshObj={_id:docs.UserProduct[asd]._id,productName: docs.UserProduct[asd].productName,productPrice: docs.UserProduct[asd].productPrice,newProductPrice: docs1.productPrice,productImg: docs.UserProduct[asd].productImg, productLink: docs.UserProduct[asd].productLink};
                                    array.push(FreshObj);


                                }

                                    temp.push(docs.UserProduct[asd]);
                                    CompleteThings(array);
                                    
                            }
                            else{
                                console.log("Nhe mila ");
                            }
                

                        })
}
                     
        return array;

    }
var boo=0;
    function CompleteThings(array){
        var Comp={};
            for(var k=0;k<array.length;k++){
                for(var j=0;j<temp.length;j++){
                    if(array[k]._id === temp[j]._id){
                        temp[j].newProductPrice=array[k].newProductPrice;
                    }

                }
  
            }
           




        var UserCollection=db.get("Watch_Products_Collection");
        for(var l=0 ;l<temp.length;l++){
                                    Comp[l]=temp[l];
                                     }
        var obj={userid : MatchUser, UserProduct:Comp};
        UserCollection.remove({});
        console.log(obj);
         UserCollection.insert(obj, function (err, doc) {
                       
                        if (err) {
                            // If it failed, return error
                            console.log("error");
                        }
                        else {boo=1;
                            console.log("Hogaya");
                        }
                    });

     

    }
function fetchData(){
homeshopping.crawlAndStore();
daraz.crawlAndStore();
bytes.crawlAndStore();

}
function findByUsername(username, fn) {
    var collection = db.get('loginUsers');
    console.log("yeh user name hai latest!!", username);
    collection.findOne({username: username}, {}, function (e, docs) {
        console.log("now in user", docs);
        if (docs) {
            return fn(null, docs);
        }
        else {
            return fn(null, null);
        }

    });
}

function findById(id, fn) {
    var collection = db.get('loginUsers');
    collection.findOne({_id: id}, {}, function (e, docs) {
        console.log("now in id", docs);
        

        if (docs) {
            RecieveId(docs.username);
            return fn(null, docs);
        }
        else {
            return fn(null, null);
        }
    });
}
var MatchUser;
function RecieveId(UserName){
    MatchUser=UserName;
}


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({

    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    req.db = db;
    next();
})

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        console.log(username, password);
        findByUsername(username, function (err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            var OldPassword = user.password.password
            console.log("This is an Old   " + OldPassword);
            var NewPassword = hash(password, user.password.salt);
            console.log("This is a New   " + NewPassword);
            if (OldPassword != NewPassword) {
                console.log("Error");
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
));
var i=1;
var pobj={};
app.use(express.static(__dirname + '/dropped/www'));
var array=[];

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/loginFailure'}),
    function (req, res) {
        res.send({sucess: true});
    });
app.get('/login', function (req, res) {
    res.send({msg: "login kr"});
});


app.get('/loginFailure', function (req, res) {
    res.send({error: true})
});

app.post('/watchProduct',function(req,res){

var collection = db.get("Watch_Products_Collection");
 var FreshObj={_id:req.body._id,productName: req.body.productName,productPrice: req.body.productPrice,newProductPrice: req.body.productPrice,productImg: req.body.productImg, productLink: req.body.productLink};
var obj={};

  collection.findOne({userid: MatchUser}, {}, function (e, docs2) {
    if(docs2){
       collection.remove({});
        console.log("Ye purana hai",docs2.UserProduct);
  
       
        console.log("Ye naya hai ", FreshObj);
        var Comp={};
        array=null;
        array=[];
        var co=0;
 for(var z in docs2.UserProduct){
    co++;
 }
 console.log(co);
        for(var k=0;k<co;k++){
            if(docs2.UserProduct[k]!=null){
             array.push(docs2.UserProduct[k]);
         }
            
         }
        
          
           array.push(FreshObj);
           console.log(array.length)
           for(var l=0 ;l<array.length;l++){
            Comp[l]=array[l];
           }
           obj={userid : MatchUser, UserProduct:Comp};
               
 collection.insert(obj, function (err, doc) {
                       
                        if (err) {
                            // If it failed, return error
                            res.send(false);
                        }
                        else {
                            res.send(true);
                        }
                    });
    }
else{
    var arra=[];
    var Com={};
    arra.push(FreshObj);
     for(var l=0 ;l<arra.length;l++){
            Com[l]=arra[l];
           }
    obj={userid : MatchUser, UserProduct:Com};
 collection.insert(obj, function (err, doc) {
                       
                        if (err) {
                            // If it failed, return error
                            res.send(false);
                        }
                        else {
                            res.send(true);
                        }
                    });

}
});
});

app.post('/register', function (req, res) {
    var collection = req.db.get("loginUsers");
    var mail = req.body.email;
    collection.findOne({email: mail}, {}, function (e, docs2) {
        console.log("checking docs 2", docs2);
        if (docs2 != null) {
            var obj = ('Used');
            res.send(obj);
        }
        else {
            var id = req.body.username;

            collection.findOne({username: id}, {}, function (e, docs3) {
                if (docs3) {
                    var obj = ('Used');
                    res.send(obj);
                }
                else {
                    console.log("pushing in the database!!!");
                    var saltPass = newSalt(16);
                    var pass = {password: hash(req.body.password, saltPass), salt: saltPass};
                    var obje = {username: req.body.username, email: req.body.email, password: pass};
                    collection.insert(obje, function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send("There was a problem adding the information to the database.");
                        }
                        else {
                            res.redirect("products");
                        }
                    });
                }
            });

        }
    });

    // Submit to the DB

});

function fetchProductsFromDB(collectionName, res) {
    var collect = db.get(collectionName);
    collect.find({}, {}, function (e, docs) {
        //console.log(collectionName,docs);
        if (docs) {
            sendData(res, docs);
        }
        else {
            return null;
        }
    });
}
function fetchWatchProductsFromDB(collectionName, res) {
    var collect = db.get(collectionName);
    collect.findOne({userid:MatchUser}, {}, function (e, docs) {
        //console.log(collectionName,docs);
        if (docs) {
            console.log("Ye watching ka docs hai",docs);
           if(counter==0){
            
            //CheckPrice();
            counter++;
        }
            console.log("Show hoja bhai",docs);
            sendData(res, docs.UserProduct);
        }
        else {
            return null;
        }
    });
}
function findProduct(res, ind, collectionName) {
    var collect = db.get(collectionName);
    collect.findOne({_id: ind}, {}, function (e, docs) {

        
        console.log("Product", docs);
        if (docs) {
            sendData(res, docs);
        }
        else {
            return null;
        }
         });
   

}
function findProductWatch(res, ind, collectionName) {
    var collect = db.get(collectionName);
    collect.findOne({userid: MatchUser}, {}, function (e, docs) {
    var co=0;
        
        if (docs) {
                for(var z in docs.UserProduct){
                         co++;
                     }
                     for(var k=0;k<co;k++)
                     {
                        if(docs.UserProduct[k]._id === ind){
                            console.log("Mila product  ",docs.UserProduct[k]);
                            sendData(res,docs.UserProduct[k]);
                        }
                     }
            //sendData(res, docs);
        }
    
        
        else {
            return null;
        }
         });
   

}
app.get('/logout', function (req, res) {
    req.session.destroy();
    req.session = null;
    req.logout();
    res.send(true);

});
app.get('/isAuthenticated', function (req, res) {
    if (req.isAuthenticated())
        res.send(true);
    else
        res.send(false);
});
var prod;
app.post('/getProducts', function (req, res) {
    prod=req.body.name;
    console.log("Yeh Collection hai",prod);
    var obj = fetchProductsFromDB(req.body.name, res);
    //console.log("checking object",obj);
});


app.get('/getWatchProducts', function (req, res) {
     fetchWatchProductsFromDB("Watch_Products_Collection", res);

    //console.log("checking object",obj);
});


app.get('/getProducts/*', function (req, res) {
    var abc = req.params[0];

    if (abc) {
        console.log("yeh single hai",prod);
        var obj = findProduct(res, req.params[0], prod);
    }
    else {
        res.send({error: true})
    }
});
app.get('/getWatchProducts/*', function (req, res) {
    var abc = req.params[0];

    if (abc) {
        var obj = findProductWatch(res, req.params[0], "Watch_Products_Collection");
    }
    else {
        res.send({error: true})
    }
});
app.listen(port);

function sendData(res, obj) {
    //console.log("finally checking object",obj);
    res.send(obj);
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/#/login");
}

function newSalt(size) {

    return crypto.randomBytes(size).toString('hex');
}
function hash(password, salt) {
    var sha256 = crypto.createHash('sha256').update(salt + password).digest("hex");
    return sha256;
}
exports.GetUser=function(){
    return MatchUser;
}