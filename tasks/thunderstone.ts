/// <reference path="../typings/tsd.d.ts" />
/// <reference path="css.d.ts" />
/// <reference path="interface.ts" />

import cheerio = require("cheerio");
import grunt = require("grunt");
import cssProcessor = require("./cssProcessor");
import htmlProcessor = require("./htmlProcessor");

module.exports = () => {
    grunt.registerTask("thunderstone",
        "Parses html and less files to generate an overview of the used css selectors",
        thunderstone);
};

function thunderstone() {
    "use strict";
    console.log("raichu bitches");
    var config: IThunderStoneConfig = grunt.config.get<IThunderStoneConfig>("thunderstone");
    console.log(config);
    var cssFiles: ICssFile[] = cssProcessor.loadCssFiles(config.css);
    console.log(cssFiles);
    var htmlFiles: IHtmlFile[] = htmlProcessor.loadHtmlFiles(config.html);
    console.log(htmlFiles);
}

