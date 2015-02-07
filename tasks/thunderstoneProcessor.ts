/// <reference path="interface.ts" />
/// <reference path="../typings/tsd.d.ts" />
import cheerio = require("cheerio");
import _ = require("underscore");

export function parseHtmlFiles(htmlFiles: IHtmlFile[], cssFiles: ICssFile[]): void {
    "use strict";
    for (var h: number = 0; h < htmlFiles.length; h++) {
        parseHtmlFile(htmlFiles[h], cssFiles);
    }
}

function parseHtmlFile(htmlFile: IHtmlFile, cssFiles: ICssFile[]): void {
    var $ = cheerio.load(htmlFile.content);
    for (var c: number = 0; c < cssFiles.length; c++) {
        parseHtmlFileWithCssFile(htmlFile, cssFiles[c], $);
    }
}

function parseHtmlFileWithCssFile(htmlFile: IHtmlFile, cssFile: ICssFile, $: CheerioStatic): void {
    if ($("link[href~='" + cssFile.fileName + "']").length > 0) {
        for (var s: number = 0; s < cssFile.selectors.length; s++) {
            parseHtmlFileWithCssFileAndSelector(htmlFile, cssFile, $, cssFile.selectors[s]);
        }
    }

}

function parseHtmlFileWithCssFileAndSelector(htmlFile: IHtmlFile, cssFile: ICssFile, $: CheerioStatic, selector: string) {
    var selectorInHtml: Cheerio = $(selector);
    if (selectorInHtml.length > 0) {
        addSelectorMathching(htmlFile, selector, cssFile);
    }
}

function addSelectorMathching(htmlFile: IHtmlFile, selector: string, cssFile: ICssFile): void {
    "use strict";
    var existingResultFile: ISelectorResult = findExistingSelectorMatch(htmlFile, cssFile);

    if (existingResultFile) {
        existingResultFile.matchingSelectors.push(selector);
    } else {
        addNewSelectorMatchToHtmlFile(htmlFile, selector, cssFile);
    }
}

function findExistingSelectorMatch(htmlFile: IHtmlFile, cssFile: ICssFile): ISelectorResult {
    "use strict";
    return _.find(htmlFile.selectorResults,(result: ISelectorResult) => {
        return (result.cssFile === cssFile);
    });
}

function addNewSelectorMatchToHtmlFile(htmlFile: IHtmlFile, selector: string, cssFile: ICssFile): void {
    "use strict";
    var result: ISelectorResult = {
        cssFile: cssFile,
        matchingSelectors: [selector]
    };
    htmlFile.selectorResults.push(result);
}