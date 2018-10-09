"use strict";

let request = require("request"); 
let langs   = require("./langs");

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

const noop = () => {};
const userAgentString = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0";

let fields = [
    "web",
    "images",
    "news",
    "social",
    "videos",
    "music"
];

let ParseBody = class {    
    web(body){
        let cache = body.data.result.items;
        for (var i in cache) for (var key in cache[i]) delete cache[i]["_id"];
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

    videos(body){
        return body;
    }

    music(body){
        return body;
    }
};

function getURL(keyword, count, offset, query, lang) { return `https://api.qwant.com/api/search/${keyword}?count=${count}&q=${query}&t=${query}&f=&offset=${offset}&locale=${lang}&uiv=4`; }

function isInt(n){ return n % 1 === 0; }

function errLog(msg){ console.log("\nqwant-api error: " + msg + "\n"); }

function isJSON(str){
    try {
        let o = JSON.parse(str);
        if (o && typeof o === "object") return o;
    }
    catch (e) { noop(); }
    return false;
}

function performSearch(query, uri, callback){
    let options = {
        url: uri,
        method : "GET",
        headers: { "User-Agent": userAgentString }
    };

    request(options, function(err, response, body){
        if (err) return errLog(err);
        if (!isJSON(body) || body == null) return errLog("The API returned an invalid response: " + body);

        let finalRes = JSON.parse(body);

        if ((finalRes.status).toString().toLowerCase() != "success") return errLog("The API returned the error code '" + finalRes.error + "'");

        let data = null;
        let parseBody = new ParseBody();

        switch(query){
            case "web": {
                data = parseBody.web(finalRes);
                break;
            }
            case "images": {
                data = parseBody.images(finalRes);
                break;
            }
            case "news": {
                data = parseBody.news(finalRes);
                break;
            }
            case "social": {
                data = parseBody.social(finalRes);
                break;
            }
            case "videos": {
                data = parseBody.videos(finalRes);
                break;   
            }
            case "music": {
                data = parseBody.music(finalRes);
                break;   
            }
            default: return errLog("Something unexpected happend");
        }

        return callback(null, data);
    });
}

let qwant = {
    search: function (query, options, callback) {
        if (!query || query == null) return errLog("'category' is required");

        query = query.toLowerCase();

        if (!fields.includes(query))    return errLog(query + "' is not a valid category.");
        if (!options || !options.query) return errLog("No search query specified.");

        let count = (options.count  ? options.count  : 1);
        let offst = (options.offset ? options.offset : 0);

        if (isNaN(count)) return errLog("'count' needs to be number");
        if (isNaN(offst)) return errLog("'offset' needs to be number");

        if (!isInt(count)) return errLog("'count' needs to be a whole number (integer)");
        if (!isInt(offst)) return errLog("'offset' needs to be a whole number (integer)");

        let sq = encodeURIComponent(options.query);
        let langKey = (options.language ? options.language : "english").toLowerCase();

        if (!(langKey in langs)) return errLog("The language '" + langKey + "' does not Exist.");

        let lang = langs[langKey];
        let queryUrl = getURL(query, count, offst, sq, lang);

        performSearch(query, queryUrl, callback);
    },

    getLanguages: function(code){ return (code ? langs : Object.keys(langs)); }
}

module.exports = qwant;
