var exports = module.exports = {};

exports.crawlAndStore = function () {

    getProducts(SAMSUNG_ID, samsung);
    getProducts(APPLE_ID, apple);
    getProducts(HTC_ID, qmobile);
    getProducts(QMOBILE_ID, htc);
    getProducts(SONY_ID, sony);
    getProducts(MICROSOFT_ID, microsoft);
    getProducts(MOTOROLA_ID, motorolla);
    getProducts(LG_ID, lg);
    getProducts(NOKIA_ID, nokia);
}

//    Requiring the modules


var request = require('request');
var cheerio = require('cheerio');
var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');
var port = process.env.PORT || 3030;
// Homeshopping producs IDs
var express = require('express')
var APPLE_ID = 227;
var SAMSUNG_ID = 30;
var HTC_ID = 29;
var QMOBILE_ID = 269;
var SONY_ID = 31;
var MICROSOFT_ID =234;
var MOTOROLA_ID = 224;
var LG_ID = 124;
var NOKIA_ID = 24;

//Collection names

var samsung = "Homeshoppingsamsungcollection";
var apple = "Homeshoppingapplecollection";
var qmobile = "Homeshoppingqmobilecollection";
var htc = "Homeshoppinghtccollection";
var sony = "Homeshoppingsonycollection";
var microsoft = "Homeshoppingmicrosoftcollection";
var motorolla = "Homeshoppingmotorollacollection";
var lg = "Homeshoppinglgcollection";
var nokia = "Homeshoppingnokiacollection";





function getProducts(brand_id, storage) {
    var page = 1;

    var collection = db.get(storage);
    collection.remove({});

    var clear = setInterval(function () {
        request("http://homeshopping.pk/categories/Mobile-Phones-Price-Pakistan/?page="+page.toString()+"&sort=newest&brandid="+brand_id+"&AjaxRequest=1", function (error, response, html) {
            if (error) {
                console.log('Homeerror');
            } else if (!error && response.statusCode == 200) {
                console.log("request executed");

                if (html != "") {
                    console.log("entered else");
                    page++;
                    var $ = cheerio.load(html);

                    var link, imgLink, name, price;


                    $('li').each(function (index, element) {

                        var elem = $(this);

                        link = elem.find('.ProductImage a').attr('href');
                        imgLink = elem.find('.ProductImage img').attr('src');
                        name = elem.find('.ProductDetails a').text();
                        price = elem.find('.ProductPriceRating em').text();
                        arr = price.split(" ");
                        var arr1=[];
                         if (price.search(" ") > 1) {
                        price = arr[2];
                        arr1=price.split("%");
                        price=arr1[1];

                    }
                    else {
                        price = arr[0]

                    }
                  //  console.log(price);
                        //var obj = {
                        //    productName: name,
                        //    productPrice: price,
                        //    productImg: imgLink,
                        //    productLink: link
                        //};
                        //storage.push(obj);
                        
                           
                            
                        
                        collection.insert({
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        });
                    });

                } else {
                    console.log("exiting...");
                    console.log(storage);
                    clearInterval(clear);
                }


            }


        });


    }, 10000);
}












