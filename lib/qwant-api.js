"use strict";

var request = require("request"); 
var url = require("url");

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var fields = [
    "web",
    "images",
    "news",
    "social"
];

function getURL(keyword, count, offset, query) { return `https://api.qwant.com/api/search/${keyword}?count=${count}&q=${query}&offset=${offset}&locale=en_us`; }

function isInt(n){ return n % 1 === 0; }

function errLog(msg){ console.log("qwant-api error: " + msg); }

function performSearch(uri, callback){
    var options = {
        url: uri,
        method : "GET",
        headers: {
            "User-Agent": "NodeJS qwant-api module"
        }
    };

console.log(uri);

    request(options, function(err, response, body){
        if (err) return errLog(err);
        var finalRes = JSON.parse(body);

        if ((finalRes.status).toString().toLowerCase() != "success") return errLog("The API returned the error code '" + finalRes.error + "'");

        callback(null, body);
    });
}

var qwant = {
    search: function (query, options, callback) {
        if (!fields.includes(query))    return errLog(query + "' is not a valid category.");
        if (!options || !options.query) return errLog("No search query specified.");

        var count = (options.count  ? options.count  : 1);
        var offst = (options.offset ? options.offset : 0);

        if (isNaN(count)) return errLog("'count' needs to be number");
        if (isNaN(offst)) return errLog("'offset' needs to be number");

        if (!isInt(count)) return errLog("'count' needs to be a whole number (integer)");
        if (!isInt(offst)) return errLog("'offset' needs to be a whole number (integer)");

        var sq = encodeURIComponent(options.query);

        var queryUrl = getURL(query, count, offst, sq);

        performSearch(queryUrl, callback);
    }
}

module.exports = qwant;
