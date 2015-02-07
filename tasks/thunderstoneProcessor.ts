/// <reference path="interface.ts" />
/// <reference path="../typings/tsd.d.ts" />
import cheerio = require("cheerio");
import _ = require("underscore");

//#region parse html
export function parseHtmlFiles(htmlFiles: IHtmlFile[], cssFiles: ICssFile[]): void {
    "use strict";
    for (var h: number = 0; h < htmlFiles.length; h++) {
        parseHtmlFile(htmlFiles[h], cssFiles);
    }
}

function parseHtmlFile(htmlFile: IHtmlFile, cssFiles: ICssFile[]): void {
    "use strict";
    var $ = cheerio.load(htmlFile.content);
    for (var c: number = 0; c < cssFiles.length; c++) {
        parseHtmlFileWithCssFile(htmlFile, cssFiles[c], $);
    }
}

function parseHtmlFileWithCssFile(htmlFile: IHtmlFile, cssFile: ICssFile, $: CheerioStatic): void {
    "use strict";
    if ($("link[href~='" + cssFile.fileName + "']").length > 0) {
        for (var s: number = 0; s < cssFile.selectors.length; s++) {
            parseHtmlFileWithCssFileAndSelector(htmlFile, cssFile, $, cssFile.selectors[s]);
        }
    }

}

function parseHtmlFileWithCssFileAndSelector(htmlFile: IHtmlFile, cssFile: ICssFile, $: CheerioStatic, selector: string) {
    "use strict";
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
//#endregion

//#region parse css
export function parseCssFiles(cssFiles: ICssFile[], htmlFiles: IHtmlFile[]): void {
    "use strict";
    for (var i: number = 0; i < cssFiles.length; i++) {
        parseCssFile(cssFiles[i], htmlFiles);
    }
}

function parseCssFile(cssFile: ICssFile, htmlFiles: IHtmlFile[]): void {
    "use strict";
    for (var i: number = 0; i < htmlFiles.length; i++) {
        parseCssFileWithGivenHtmlFile(cssFile, htmlFiles[i]);
    }
}

function parseCssFileWithGivenHtmlFile(cssFile: ICssFile, htmlFile: IHtmlFile): void{
    "use strict";
    var $: CheerioStatic = cheerio.load(htmlFile.content);
    if ($("link[href~='" + cssFile.fileName + "']").length > 0) {
        for (var s: number = 0; s < cssFile.selectors.length; s++) {
            parseCssFileWithGivenHtmlFileAndGivenSelector(cssFile, htmlFile,$, cssFile.selectors[s]);
        }
    }
}

function parseCssFileWithGivenHtmlFileAndGivenSelector(cssFile: ICssFile, htmlFile: IHtmlFile, $: CheerioStatic, selector: string): void {
    "use strict";
    var matchingSelector = $(selector);
    if (matchingSelector.length > 0) {
        addHtmlPageToUsage(cssFile, htmlFile, selector, matchingSelector.length);
    }
}

function addHtmlPageToUsage(cssFile: ICssFile, htmlFile: IHtmlFile, selector: string, count: number): void {
    "use strict";
    var existingUsageResult: IHtmlUsageResult = findExistingHtmlUsageResult(cssFile, htmlFile);

    if (existingUsageResult) {
        addSelectorToExistingUsage(existingUsageResult, selector, count);
    } else {
        addNewUsageToCssFile(cssFile, htmlFile, selector, count);
    }
}

function findExistingHtmlUsageResult(cssFile: ICssFile, htmlFile: IHtmlFile): IHtmlUsageResult {
    "use strict";
    return _.find(cssFile.usageResults,(usageResult: IHtmlUsageResult): boolean => {
        return (usageResult.htmlFile === htmlFile);
    });
}

function addNewUsageToCssFile(cssFile: ICssFile, htmlFile: IHtmlFile, selector: string, count: number): void {
    "use strict";
    cssFile.usageResults.push({
        htmlFile: htmlFile,
        matchingSelectors: [{
            count: count,
            selector:selector
        }]
    });
}

function addSelectorToExistingUsage(usageResult: IHtmlUsageResult, selector: string, count: number): void {
    "use strict";
    usageResult.matchingSelectors.push({
        selector: selector,
        count:count
    });
}
//#endregion