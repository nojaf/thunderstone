﻿import grunt = require("grunt");
export function loadHtmlFiles(patterns: string[]): IHtmlFile[]{
    "use strict";
    var htmlPaths: string[] = grunt.file.expand(patterns);
    var htmlFiles: IHtmlFile[] = [];
	for (var i: number = 0; i < htmlPaths.length; i++) {
	    htmlFiles.push(loadHtmlFile(htmlPaths[i]));
	}
    return htmlFiles;
}

function loadHtmlFile(path: string): IHtmlFile {
    "use strict";
    var htmlFile: IHtmlFile = {
        relativePath: path,
        content: grunt.file.read(path),
        selectorResults:[]
    };
    return htmlFile;
}