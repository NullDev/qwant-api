"use strict";
var qwant = require("../lib/qwant-api");

qwant.search("web", { query: "nodejs" }, function(err, data){
    if (err) return console.log(err);
    console.log("Web Search: \n\n" + JSON.stringify(data, null, 4) + "\n\n----\n");
});

qwant.search("images", { query: "cat" }, function(err, data){
    if (err) return console.log(err);
    console.log("Image Search: \n\n" + JSON.stringify(data, null, 4) + "\n\n----\n");
});

qwant.search("news", { query: "bitcoin" }, function(err, data){
    if (err) return console.log(err);
    console.log("News Search: \n\n" + JSON.stringify(data, null, 4) + "\n\n----\n");
});

qwant.search("social", { query: "null_ping twitter" }, function(err, data){
    if (err) return console.log(err);
    console.log("Social Search: \n\n" + JSON.stringify(data, null, 4) + "\n\n----\n");
});
