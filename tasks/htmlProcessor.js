var grunt = require("grunt");
var path = require("path");
function loadHtmlFiles(patterns) {
    "use strict";
    var htmlPaths = grunt.file.expand(patterns);
    var htmlFiles = [];
    for (var i = 0; i < htmlPaths.length; i++) {
        htmlFiles.push(loadHtmlFile(htmlPaths[i]));
    }
    return htmlFiles;
}
exports.loadHtmlFiles = loadHtmlFiles;
function loadHtmlFile(htmlPath) {
    "use strict";
    var htmlFile = {
        relativePath: htmlPath,
        fileName: path.basename(htmlPath),
        content: grunt.file.read(htmlPath),
        selectorResults: [],
        id: createID(path.basename(htmlPath))
    };
    return htmlFile;
}
function createID(fileName) {
    return fileName.toLowerCase().replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|\n|-+$/g, '');
}
