var exports = module.exports = {};


exports.crawlAndStore = function () {
    getProducts(samungPhone, samsung, sam);
    getProducts(applePhone, apple, appl);
    getProducts(qmobilePhone, qmobile, qmob);
    getProducts(htcPhone, htc, ht);

}

var request = require('request');
var cheerio = require('cheerio');
var S = require('string');

var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');


var samsung = "Bytessamsungcollection";
var apple = "Bytesapplecollection";
var qmobile = "Bytesqmobilecollection";
var htc = "Byteshtccollection";


var samsungStorage = [];
var appleStorage = [];
var htcStorage = [];
var qmobileStorage = [];

var samungPhone = "samsung";
var applePhone = "apple";
var qmobilePhone = "qmobile";
var htcPhone = "htc"
var sam = "Samsung"
var appl = "Apple"
var qmob = "QMobile"
var ht = "HTC";
var page;


function getProducts(brand_id, storage, match) {
    var page = 1;
    // var obj;

    var collection = db.get(storage);
    collection.remove({});

    var clear = setInterval(function () {
        request("http://www.bytes.pk/" + brand_id + "/?sort=newest&page=" + page, function (error, response, html) {
            if (error) {
                console.log('error');
            } else if (!error && response.statusCode == 200) {
                console.log("request executed");


                console.log("entered else");
                page++;
                var $ = cheerio.load(html);
                //console.log(html)
                var link, imgLink, name, price, brand, temp;
                var arr = [];


                $('.Odd').each(function (index, element) {
                    var elem = $(this);


                    link = elem.find('.ProductImage');
                    link = link.find('a').attr('href');
                    imgLink = elem.find('img').attr('src');
                    name = elem.find('.ProductDetails a').text();
                    price = elem.find('.p-price').text();
                    arr = price.split(" ");

                    // price=S(price).contains('strike').s
                    //price =S(price).stripRight('</strike>').s
                    //arr[0]=price;

                    //console.log(price);
                    var obj = {
                        productName: name,
                        productPrice: price,
                        productImg: imgLink,
                        productLink: link
                    };
                    //console.log(name);
                    if (price.search(" ") > 1) {
                        price = arr[1];

                    }
                    else {
                        price = arr[0]

                    }
                    console.log(price)
                    // console.log(imgLink);
                    //console.log(link);
                    // storage.push(obj);

                    // console.log("\n")
                    //console.log(price);
                    if (imgLink != null) {
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
    return 0;
}