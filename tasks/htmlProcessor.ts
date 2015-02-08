import grunt = require("grunt");
import path = require("path");
import _ = require("underscore");
export function loadHtmlFiles(patterns: string[]): IHtmlFile[]{
    "use strict";
    var htmlPaths: string[] = grunt.file.expand(patterns);
    var htmlFiles: IHtmlFile[] = [];
	for (var i: number = 0; i < htmlPaths.length; i++) {
	    htmlFiles.push(loadHtmlFile(htmlPaths[i]));
	}
    return sortHtmlFiles(htmlFiles);
}

function loadHtmlFile(htmlPath: string): IHtmlFile {
    "use strict";
    var htmlFile: IHtmlFile = {
        relativePath: htmlPath,
        fileName: path.basename(htmlPath),
        content: grunt.file.read(htmlPath),
        selectorResults: [],
        id: createID(path.basename(htmlPath))
    };
    return htmlFile;
}

function createID(fileName: string): string {
    return fileName.toLowerCase()
        .replace(/[^a-zA-Z0-9-_]+/g, '-')
        .replace(/^-+|\n|-+$/g, '');
}

function sortHtmlFiles(htmlFiles:IHtmlFile[]):IHtmlFile[]{
    return _.sortBy(htmlFiles, (htmlFile:IHtmlFile) => {
            return htmlFile.fileName;
        });
}