var grunt = require("grunt");
var css = require("css");
var path = require("path");
var _ = require("underscore");
function loadCssFiles(patterns) {
    var cssPaths = grunt.file.expand(patterns);
    var cssFiles = [];
    for (var i = 0; i < cssPaths.length; i++) {
        cssFiles.push(parseCssFile(cssPaths[i]));
    }
    return sortCssFiles(cssFiles);
}
exports.loadCssFiles = loadCssFiles;
function parseCssFile(cssPath) {
    var cssContent = grunt.file.read(cssPath);
    var cssObject = css.parse(cssContent);
    var cssFile = {
        relativePath: cssPath,
        selectors: getSelectorsFromCssObject(cssObject),
        fileName: path.basename(cssPath),
        usageResults: [],
        id: createID(path.basename(cssPath))
    };
    return cssFile;
}
function createID(fileName) {
    return fileName.toLowerCase().replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|\n|-+$/g, '');
}
function getSelectorsFromCssObject(cssObject) {
    var selectors = [];
    for (var r = 0; r < cssObject.stylesheet.rules.length; r++) {
        var rule = cssObject.stylesheet.rules[r];
        selectors = selectors.concat(rule.selectors);
    }
    return selectors;
}
function sortCssFiles(cssFiles) {
    return _.sortBy(cssFiles, function (cssFile) {
        return cssFile.fileName;
    });
}
