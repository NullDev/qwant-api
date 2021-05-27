"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// Dependencies
let fetch = require("node-fetch").default;

// Utils
let languages = require("./langs");
// @ts-ignore
let { getURL, isJSON } = require("./utils");

/**
 * Qwant Search Wrapper
 *
 * @class Qwant
 */
class Qwant {
    /**
     * Creates an instance of Qwant.
     *
     * @param {string} [UA=null] - Custum UserAgent-String
     * @memberof Qwant
     */
    constructor(UA = null){
        this.UA = UA ?? "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0";
        this.fields = ["web", "images", "news", "social", "videos", "music"];
    }

    /**
     * Check if the query is valid
     *
     * @param {string} category
     * @param {object} options
     * @returns {string|boolean}
     */
    #invalidQueryProvided = (category, options) => {
        if (!category) return "No category was provided.";
        if (!this.fields.includes(category.toLowerCase())) return `Invalid category was provided: ${category}`;
        if (!(options && options.query)) return "No search query was provided.";
        return false;
    }

    /**
     * Check if the parameters are valid
     *
     * @param {number} count
     * @param {number} offst
     * @returns {string|boolean}
     */
    #parametersAreInvalid = (count, offst) => {
        if (Number.isNaN(count)) return "'count' needs to be number";
        if (Number.isNaN(offst)) return "'offset' needs to be number";
        if (!Number.isInteger(count)) return "'count' needs to be a whole number (integer)";
        if (!Number.isInteger(offst)) return "'offset' needs to be a whole number (integer)";
        return false;
    }

    #performSearch = async(query, queryURL) => {
        const options = {
            method: "GET",
            headers: {
                "User-Agent": this.UA
            }
        };

        let res = await (await fetch(queryURL, options)).json();
    }

    /**
     * Perform a qwant search
     *
     * @param {string} query
     * @param {object} options
     * @returns
     * @memberof Qwant
     */
    async search(query, options){
        return new Promise((resolve, reject) => {
            let queryIsInvalid = this.#invalidQueryProvided(query, options);
            if (!!queryIsInvalid) return reject(`qwant-api error: ${queryIsInvalid}`);

            const count = options.count ?? 1;
            const offst = options.offset ?? 0;

            let parametersAreInvalid = this.#parametersAreInvalid(count, offst);
            if (!!parametersAreInvalid) return reject(`qwant-api error: ${queryIsInvalid}`);

            const sq = encodeURIComponent(options.query);
            const langKey = (options.language ?? "english").toLowerCase();

            if (!(langKey in languages)) return reject(`qwant-api error: The language '${langKey}' does not Exist.`);

            const lang = languages[langKey];
            const queryURL = getURL(query, count, offst, sq, lang);

            try {
                return resolve(this.#performSearch(query, queryURL));
            }
            catch (err){
                return reject(err);
            }
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
