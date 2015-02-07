/// <reference path="../typings/tsd.d.ts" />
/// <reference path="css.d.ts" />
/// <reference path="interface.ts" />
import grunt = require("grunt");
import cssProcessor = require("./cssProcessor");
import htmlProcessor = require("./htmlProcessor");
import thunderstoneProcessor = require("./thunderstoneProcessor");

module.exports = () => {
    grunt.registerTask("thunderstone",
        "Parses html and css files to generate an overview of the used css selectors",
        thunderstone);
};

function thunderstone() {
    "use strict";
    console.log("raichu bitches");
    var config: IThunderStoneConfig = grunt.config.get<IThunderStoneConfig>("thunderstone");
    var cssFiles: ICssFile[] = cssProcessor.loadCssFiles(config.css);
    var htmlFiles: IHtmlFile[] = htmlProcessor.loadHtmlFiles(config.html);

    thunderstoneProcessor.parseHtmlFiles(htmlFiles, cssFiles);
    thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);

    console.log(cssFiles[0].usageResults[0]);

}

