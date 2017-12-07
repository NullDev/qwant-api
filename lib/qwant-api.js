"use strict";

var request = require("request"); 
var langs   = require("./langs");

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var noop = () => {};

var fields = [
    "web",
    "images",
    "news",
    "social"
];

var ParseBody = class {    
    web(body){
        var cache = body.data.result.items;
        for (i of cache) for (key in cache[i]) delete cache[i]["_id"];
        return cache;
    }

    images(body){
        return body;
    }

    news(body){
        return body;
    }

    social(body){
        return body;
    }
};

function getURL(keyword, count, offset, query, lang) { return `https://api.qwant.com/api/search/${keyword}?count=${count}&q=${query}&offset=${offset}&locale=${lang}`; }

function isInt(n){ return n % 1 === 0; }

function errLog(msg){ console.log("\nqwant-api error: " + msg + "\n"); }

function isJSON(str){
    try {
        var o = JSON.parse(str);
        if (o && typeof o === "object") return o;
    }
    catch (e) { noop(); }
    return false;
}

function performSearch(query, uri, callback){
    var options = {
        url: uri,
        method : "GET",
        headers: { "User-Agent": "NodeJS qwant-api module" }
    };

    request(options, function(err, response, body){
        if (err) return errLog(err);

        if (!isJSON(body) || body == null) return errLog("The API returned an invalid response: " + body);

        var finalRes = JSON.parse(body);

        if ((finalRes.status).toString().toLowerCase() != "success") return errLog("The API returned the error code '" + finalRes.error + "'");

        var data = null;

        var parseBody = new ParseBody();

        switch(query){
            case "web": {
                data = parseBody.web(body);
                break;
            }
            case "images": {
                data = parseBody.images(body);
                break;
            }
            case "news": {
                data = parseBody.news(body);
                break;
            }
            case "social": {
                data = parseBody.social(body);
                break;
            }
            default: return errLog("Something unexpected happend");
        }

        return callback(null, data);
    });
}

var qwant = {
    search: function (query, options, callback) {
        if (!query || query == null) return errLog("'category' is required");

        query = query.toLowerCase();

        if (!fields.includes(query))    return errLog(query + "' is not a valid category.");
        if (!options || !options.query) return errLog("No search query specified.");

        var count = (options.count  ? options.count  : 1);
        var offst = (options.offset ? options.offset : 0);

        if (isNaN(count)) return errLog("'count' needs to be number");
        if (isNaN(offst)) return errLog("'offset' needs to be number");

        if (!isInt(count)) return errLog("'count' needs to be a whole number (integer)");
        if (!isInt(offst)) return errLog("'offset' needs to be a whole number (integer)");

        var sq = encodeURIComponent(options.query);

        var langKey = (options.language ? options.language : "english").toLowerCase();

        if (!(langKey in langs)) return errLog("The language '" + langKey + "' does not Exist.");

        var lang = langs[langKey];

        var queryUrl = getURL(query, count, offst, sq, lang);

        performSearch(query, queryUrl, callback);
    },

    getLanguages: function(code){ return (code ? langs : Object.keys(langs)); }
}

module.exports = qwant;
