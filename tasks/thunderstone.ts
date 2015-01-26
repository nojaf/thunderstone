/// <reference path="../typings/tsd.d.ts" />
/// <reference path="interface.ts" />
"use strict";
import cheerio = require("cheerio");
var $:CheerioStatic;
module.exports = (grunt: IGrunt) => {
    grunt.registerTask("thunderstone",
        "Parses html and less files to generate an overview of the used css selectors",
        () => thunderstone(grunt));
}

function thunderstone(grunt:IGrunt) {
    console.log("raichu bitches");
    var config: IThunderStoneConfig = grunt.config.get<IThunderStoneConfig>("thunderstone");
    console.log(config);
    $ = cheerio.load("<html><body><h1>the title</h1><body></html>");
    console.log($("h1").text());
}

