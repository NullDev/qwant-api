"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let request = require("request");
let langs = require("./langs");

// @ts-ignore
let { isJSON, errLog, isInt, getURL } = require("./utils");

let ParseBody = class {
    web(body){
        let cache = body.data.result.items;
        // eslint-disable-next-line no-unused-vars
        for (let i in cache) for (let _key in cache[i]) delete cache[i]._id;
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

function performSearch(query, uri, callback){
    let options = {
        url: uri,
        method: "GET",
        headers: { "User-Agent": userAgentString }
    };

    request(options, function(err, response, body){
        if (err) return errLog(err);
        if (!isJSON(body) || !body) return errLog("The API returned an invalid response: " + body);

        let finalRes = JSON.parse(body);

        if ((finalRes.status).toString().toLowerCase() !== "success") return errLog("The API returned the error code '" + finalRes.error + "'");

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
    search(query, options, callback) {
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

        return performSearch(query, queryUrl, callback);
    }
};

module.exports = qwant;
