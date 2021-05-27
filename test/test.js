"use strict";

let Qwant = require("../lib/qwant-api");
let qwant = new Qwant();

qwant.search("web", { query: "nodejs" })
    .then(res => console.log("Web Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));

qwant.search("images", { query: "cat" })
    .then(res => console.log("Image Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));

qwant.search("news", { query: "bitcoin" })
    .then(res => console.log("News Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));

qwant.search("social", { query: "bill gates" })
    .then(res => console.log("Social Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));

qwant.search("videos", { query: "memes" })
    .then(res => console.log("Videos Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));

qwant.search("music", { query: "twenty one pilots" })
    .then(res => console.log("Music Search: \n\n" + JSON.stringify(res, null, 4) + "\n\n----\n"))
    .catch(err => console.log("Got an Error: " + err));
