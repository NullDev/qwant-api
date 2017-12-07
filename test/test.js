"use strict";
var qwant = require("../lib/qwant-api");

qwant.search("web", { query: "test" }, function(err, data){
    if (err) return console.log(err);
    console.log(data);
});
