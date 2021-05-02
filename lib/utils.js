"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

class Utils {
    /**
     * Construct the API URL
     *
     * @static
     * @param {string} keyword
     * @param {string} count
     * @param {string} offset
     * @param {string} query
     * @param {string} lang
     * @return {string}
     * @memberof Utils
     */
    static getURL(keyword, count, offset, query, lang){
        return `https://api.qwant.com/api/search/${keyword}?count=${count}&q=${query}&t=${query}&f=&offset=${offset}&locale=${lang}&uiv=4`;
    }

    /**
     * Check if the given argument is valid JSON
     *
     * @static
     * @param {any} obj
     * @return {boolean}
     * @memberof Utils
     */
    static isJSON(obj){
        try {
            JSON.parse(obj);
        }
        catch (e){
            return false;
        }
        return true;
    }
}

module.exports = Utils;
