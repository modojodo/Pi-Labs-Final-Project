var exports = module.exports = {};



var request = require('request');
var cheerio = require('cheerio');
var S = require('string');

var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');
var port = process.env.PORT || 3030;

var samsung = "Darazsamsungcollection";
var apple = "Darazapplecollection";
var qmobile = "Darazqmobilecollection";
var microsoft= "Darazmicrosoftcollection"
var nokia= "Daraznokiacollection"
var sony= "Darazsonycollection"

var array=[];

var samungPhone = "samsung";
var applePhone = "apple";
var qmobilePhone = "qmobile"
var microsoftPhone = "microsoft";
var nokiaPhone = "nokia"
var sonyPhone = "sony";

var sam = "Samsung"
var appl = "Apple"
var qmob = "QMobile"
var micro = "Microsoft"
var nok = "Nokia"
var son = "Sony"

var page;


exports.crawlAndStore = function () {

   getProducts(samungPhone, samsung, sam);
    getProducts(applePhone, apple, appl);
   getProducts(qmobilePhone, qmobile, qmob);
   getProducts(microsoftPhone, microsoft, micro);
   getProducts(nokiaPhone, nokia, nok);
   getProducts(sonyPhone, sony, son);


}

function getProducts(brand_id, storage, match) {
    var page = 1;
    var counter=0;
    var c=0;
    var FreshObj={}
    // var obj;


    var collection = db.get(storage);
    collection.remove({});

    var clear = setInterval(function () {
        request("http://www.daraz.pk/mobile-phones/" + brand_id + "/?pathInfo=mobile-phones%2F" + brand_id + "&page=" + page, function (error, response, html) {
            if (error) {
                console.log('Darazerror');
            } else if (!error && response.statusCode == 200) {
               // console.log("request executed");


               // console.log("entered else");
                page++;
                var $ = cheerio.load(html);
                //console.log(html)
                var link, imgLink, name, price, brand;
                var arr=[];

                $('.itm-link').each(function (index, element) {
                    var elem = $(this);
                    link = $(this).attr('href');
                    //console.log(elem);
                    //link = elem.find('.itm-link a').attr('href');
                    imgLink = elem.find('.itm-img').attr('src');
                    name = elem.find('.itm-title').text();
                    name = S(name).collapseWhitespace().s
                    brand = elem.find('.itm-brand').text();
                    price = elem.find('.mrs').text();
                    price = S(price).collapseWhitespace().s;
                    var newPrice=price;
                    arr = price.split(" ");

                if (arr[1]=='Offers') {
                         price = elem.find('.lowestOfferValue').text();
                    price = S(price).collapseWhitespace().s;
                    }
                    else{
                        price=newPrice;
                    }
                   // console.log(price);
                    var obj = {
                        productName: name,
                        productPrice: price,
                        productImg: imgLink,
                        productLink: link
                    };

                    // storage.push(obj);

                    // console.log("\n")
                    //console.log(price);
                    if (brand === match) {

                     

                        collection.insert({
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        });
                    }
                    else {
                        console.log("exiting...");
                        console.log(storage);

                        clearInterval(clear);
                    }
                });


            }


        });


    }, 10000);
console.log("Done");
}

/*
*/
