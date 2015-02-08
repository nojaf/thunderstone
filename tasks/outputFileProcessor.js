/// <reference path="interface.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="vash.d.ts" />
var fs = require("fs");
var vash = require("vash");
var grunt = require("grunt");
function createByCssOutput(cssFiles, outputFolder) {
    createOutputFolder(outputFolder);
    var output = render("templates/byCssFile.vash", cssFiles);
    grunt.file.write(outputFolder + "byCss.html", output);
}
exports.createByCssOutput = createByCssOutput;
function createByHtmlOutput(htmlFiles, outputFolder) {
    createOutputFolder(outputFolder);
    var output = render("templates/byHtml.vash", htmlFiles);
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
