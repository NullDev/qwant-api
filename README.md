# Qwant API

<p align="center">
<img height="150" width="auto" src="https://www.qwant.com/favicon.png" /><br>
Unofficial API wrapper for qwant
</p>

## :postbox: NPM

[![](https://nodei.co/npm/qwant-api.svg?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/qwant-api)

## :wrench: Installation

```Assembly
npm i qwant-api
```

## :white_check_mark: Features

Qwant Feature support
  
| web | images | news | social |
| :---: | :---: | :---: | :---: |
| :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## :bulb: Usage

```Javascript
var qwant = require("qwant-api");

qwant.search("web", { query: "test" }, function(err, data){
    if (err) return console.log(err);
    console.log(data);
});
```
## :clipboard: TODO:

Everything.
