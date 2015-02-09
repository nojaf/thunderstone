/// <reference path="../typings/tsd.d.ts" />
/// <reference path="css.d.ts" />
/// <reference path="interface.ts" />
import grunt = require("grunt");
import cssProcessor = require("./cssProcessor");
import htmlProcessor = require("./htmlProcessor");
import thunderstoneProcessor = require("./thunderstoneProcessor");
import outputFileProcessor = require("./outputFileProcessor");

module.exports = () => {
    grunt.registerTask("thunderstone",
        "Parses html and css files to generate an overview of the used css selectors",
        thunderstone);
};

function thunderstone() {
    "use strict";
    console.log("What?")
    console.log("PIKACHU is evolving!");
    var config: IThunderStoneConfig = grunt.config.get<IThunderStoneConfig>("thunderstone");
    var cssFiles: ICssFile[] = cssProcessor.loadCssFiles(config.css);
    console.log("Found " + cssFiles.length + " css files");
    var htmlFiles: IHtmlFile[] = htmlProcessor.loadHtmlFiles(config.html);
    console.log("Found " + htmlFiles.length + " html files");

    thunderstoneProcessor.parseHtmlFiles(htmlFiles, cssFiles);
    console.log("Processed html");
    thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);
    console.log("Processed css");

    outputFileProcessor.createByCssOutput(cssFiles, config.outputDir);
    outputFileProcessor.createByHtmlOutput(htmlFiles, config.outputDir);
    console.log("RAICHU bitches");
}

