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
    console.log("raichu bitches");
    var config = grunt.config.get("thunderstone");
    var cssFiles = cssProcessor.loadCssFiles(config.css);
    var htmlFiles = htmlProcessor.loadHtmlFiles(config.html);
    thunderstoneProcessor.parseHtmlFiles(htmlFiles, cssFiles);
    thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);
    outputFileProcessor.createByCssOutput(cssFiles, config.outputDir);
    outputFileProcessor.createByHtmlOutput(htmlFiles, config.outputDir);
}
