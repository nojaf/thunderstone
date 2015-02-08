/// <reference path="../typings/tsd.d.ts" />
/// <reference path="css.d.ts" />
/// <reference path="interface.ts" />
var grunt = require("grunt");
var cssProcessor = require("./cssProcessor");
var htmlProcessor = require("./htmlProcessor");
var thunderstoneProcessor = require("./thunderstoneProcessor");
var outputFileProcessor = require("./outputFileProcessor");
module.exports = function () {
    grunt.registerTask("thunderstone", "Parses html and css files to generate an overview of the used css selectors", thunderstone);
};
function thunderstone() {
    "use strict";
    console.log("What?");
    console.log("PIKACHU is evolving!");
    var config = grunt.config.get("thunderstone");
    var cssFiles = cssProcessor.loadCssFiles(config.css);
    console.log("Found " + cssFiles.length + " css files");
    var htmlFiles = htmlProcessor.loadHtmlFiles(config.html);
    console.log("Found " + htmlFiles.length + " html files");
    thunderstoneProcessor.parseHtmlFiles(htmlFiles, cssFiles);
    console.log("Processed html");
    thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);
    console.log("Processed css");
    outputFileProcessor.createByCssOutput(cssFiles, config.outputDir);
    outputFileProcessor.createByHtmlOutput(htmlFiles, config.outputDir);
    console.log("RAICHU bitches");
}
