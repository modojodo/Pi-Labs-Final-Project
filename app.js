/**
 * Created by Umer on 7/31/2015.
 */

var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
var port = process.env.PORT || 3030;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');

//Requiring the crawler scripts

var bytes= require('./bytes.js');
var homeshopping = require('./home-shopping.js')
var daraz = require('./home-shopping.js')

//bytes.crawlAndStore();
//homeshopping.crawlAndStore();
//daraz.crawlAndStore();



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
            return fn(null, docs);
        }
        else {
            return fn(null, null);
        }
    });
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

app.use(express.static(__dirname + '/dropped/www'));


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
                            res.redirect("/#/products");
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

app.get('/getBytesSamsung', function (req, res) {
    var obj = fetchProductsFromDB("Bytessamsungcollection", res);
    //console.log("checking object",obj);
});

app.get('/getBytesSamsung/*', function (req, res) {
    var abc = req.params[0];

    if (abc) {
        var obj = findProduct(res, req.params[0], "Bytessamsungcollection");
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
