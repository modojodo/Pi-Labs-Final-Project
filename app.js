/**
 * Created by Umer on 7/22/2015.
 */
var request = require('request');
var cheerio = require('cheerio');

var APPLE_ID=227;
var SAMSUNG_ID=30;



var samsungStorage = [];
var appleStorage = [];



getProducts(SAMSUNG_ID, samsungStorage);

getProducts(APPLE_ID,appleStorage);






function getProducts(brand_id, storage){
storage = [];
    var page=1;

   var clear= setInterval(function(){
        request("http://homeshopping.pk/categories/Mobile-Phones-Price-Pakistan/?page=" + page.toString() + "&sort=newest&brandid="+brand_id+"&AjaxRequest=1", function (error, response, html) {
            if(error){
                console.log('error');
            }else
            if (!error && response.statusCode == 200) {
                console.log("request executed");

                if(html!="") {
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

                        var obj = {
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        };
                        storage.push(obj);




                    });

                }else{
                    console.log("exiting...");
                    console.log(storage);
                   clearInterval(clear);
                }


            }


        });


    }, 5000)


}











