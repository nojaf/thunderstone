/// <reference path="interface.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="vash.d.ts" />
var fs = require("fs");
var vash = require("vash");
var grunt = require("grunt");
function createByCssOutput(cssFiles, outputFolder) {
    createOutputFolder(outputFolder);
    var templateUrl = getTemplateUrl("templates/byCssFile.vash");
    var output = render(templateUrl, cssFiles);
    grunt.file.write(outputFolder + "byCss.html", output);
}
exports.createByCssOutput = createByCssOutput;
function createByHtmlOutput(htmlFiles, outputFolder) {
    createOutputFolder(outputFolder);
    var templateUrl = getTemplateUrl("templates/byHtmlFile.vash");
    var output = render(templateUrl, htmlFiles);
    grunt.file.write(outputFolder + "byHtml.html", output);
}
exports.createByHtmlOutput = createByHtmlOutput;
function render(templatePath, model) {
    var byCssFileTemplate = grunt.file.read(templatePath);
    var templateFunction = vash.compile(byCssFileTemplate);
    return templateFunction(model);
}
function createOutputFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}
function getTemplateUrl(relativeUrl) {
    if (grunt.file.exists(relativeUrl)) {
        return relativeUrl;
    }
    else {
        return "node_modules/thunderstone/" + relativeUrl;
    }
}
