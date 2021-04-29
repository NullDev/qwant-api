"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// Dependencies
let fetch = require("node-fetch");

// Utils
let languages = require("./langs");

/**
 * Qwant Search Wrapper
 *
 * @class Qwant
 */
class Qwant {
    /**
     * Creates an instance of Qwant.
     *
     * @memberof Qwant
     */
    constructor(){
        this.UA = "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0";
        this.fields = ["web", "images", "news", "social", "videos", "music"];
    }

    #invalidQueryProvided = (category, options) => {
        if (!category) return "No category was provided.";
        if (!this.fields.includes(category.toLowerCase())) return "qwant-api error: Invalid category was provided.";
    }

    #performSearch = () => {
        const options = {
            method: "GET",
            headers: {
                "User-Agent": this.UA
            }
        };
    }

    async search(query, options){
        return new Promise((resolve, reject) => {
            let queryIsInvalid = this.#invalidQueryProvided(query, options);
            if (!!queryIsInvalid) return reject(`qwant-api error: ${queryIsInvalid}`);
        });
    }

    /**
     * Get valid languages
     *
     * @param {boolean} showCodes
     * @return {object} languages
     * @memberof Qwant
     */
    getLanguages(showCodes){
        return (showCodes ? languages : Object.keys(languages));
    }
}

module.exports = Qwant;
