/// <reference path="interface.ts" />
/// <reference path="../typings/tsd.d.ts" />
var cheerio = require("cheerio");
var _ = require("underscore");
//#region parse html
function parseHtmlFiles(htmlFiles, cssFiles) {
    "use strict";
    for (var h = 0; h < htmlFiles.length; h++) {
        parseHtmlFile(htmlFiles[h], cssFiles);
    }
}
exports.parseHtmlFiles = parseHtmlFiles;
function parseHtmlFile(htmlFile, cssFiles) {
    "use strict";
    var $ = cheerio.load(htmlFile.content);
    for (var c = 0; c < cssFiles.length; c++) {
        parseHtmlFileWithCssFile(htmlFile, cssFiles[c], $);
        sortHtmlResult(htmlFile);
    }
}
function parseHtmlFileWithCssFile(htmlFile, cssFile, $) {
    "use strict";
    if ($("link[href~='" + cssFile.fileName + "']").length > 0) {
        for (var s = 0; s < cssFile.selectors.length; s++) {
            parseHtmlFileWithCssFileAndSelector(htmlFile, cssFile, $, cssFile.selectors[s]);
        }
    }
}
function sortHtmlResult(htmlFile) {
    htmlFile.selectorResults = _.sortBy(htmlFile.selectorResults, function (result) {
        result.matchingSelectors = _.sortBy(result.matchingSelectors, function (selector) {
            return selector;
        });
        return result.cssFile.fileName;
    });
}
function parseHtmlFileWithCssFileAndSelector(htmlFile, cssFile, $, selector) {
    "use strict";
    var selectorInHtml = $(selector);
    if (selectorInHtml.length > 0) {
        addSelectorMathching(htmlFile, selector, cssFile);
    }
}
function addSelectorMathching(htmlFile, selector, cssFile) {
    "use strict";
    var existingResultFile = findExistingSelectorMatch(htmlFile, cssFile);
    if (existingResultFile) {
        existingResultFile.matchingSelectors.push(selector);
    }
    else {
        addNewSelectorMatchToHtmlFile(htmlFile, selector, cssFile);
    }
}
function findExistingSelectorMatch(htmlFile, cssFile) {
    "use strict";
    return _.find(htmlFile.selectorResults, function (result) {
        return (result.cssFile === cssFile);
    });
}
function addNewSelectorMatchToHtmlFile(htmlFile, selector, cssFile) {
    "use strict";
    var result = {
        cssFile: cssFile,
        matchingSelectors: [selector]
    };
    htmlFile.selectorResults.push(result);
}
//#endregion
//#region parse css
function parseCssFiles(cssFiles, htmlFiles) {
    "use strict";
    for (var i = 0; i < cssFiles.length; i++) {
        parseCssFile(cssFiles[i], htmlFiles);
    }
}
exports.parseCssFiles = parseCssFiles;
function parseCssFile(cssFile, htmlFiles) {
    "use strict";
    for (var i = 0; i < htmlFiles.length; i++) {
        parseCssFileWithGivenHtmlFile(cssFile, htmlFiles[i]);
        sortCssResult(cssFile);
    }
}
function parseCssFileWithGivenHtmlFile(cssFile, htmlFile) {
    "use strict";
    var $ = cheerio.load(htmlFile.content);
    if ($("link[href~='" + cssFile.fileName + "']").length > 0) {
        for (var s = 0; s < cssFile.selectors.length; s++) {
            parseCssFileWithGivenHtmlFileAndGivenSelector(cssFile, htmlFile, $, cssFile.selectors[s]);
        }
    }
}
function sortCssResult(cssFile) {
    cssFile.usageResults = _.sortBy(cssFile.usageResults, function (usage) {
        usage.matchingSelectors = _.sortBy(usage.matchingSelectors, function (htmlSelector) {
            return htmlSelector.selector;
        });
        return usage.htmlFile.fileName;
    });
}
function parseCssFileWithGivenHtmlFileAndGivenSelector(cssFile, htmlFile, $, selector) {
    "use strict";
    var matchingSelector = $(selector);
    if (matchingSelector.length > 0) {
        addHtmlPageToUsage(cssFile, htmlFile, selector, matchingSelector.length);
    }
}
function addHtmlPageToUsage(cssFile, htmlFile, selector, count) {
    "use strict";
    var existingUsageResult = findExistingHtmlUsageResult(cssFile, htmlFile);
    if (existingUsageResult) {
        addSelectorToExistingUsage(existingUsageResult, selector, count);
    }
    else {
        addNewUsageToCssFile(cssFile, htmlFile, selector, count);
    }
}
function findExistingHtmlUsageResult(cssFile, htmlFile) {
    "use strict";
    return _.find(cssFile.usageResults, function (usageResult) {
        return (usageResult.htmlFile === htmlFile);
    });
}
function addNewUsageToCssFile(cssFile, htmlFile, selector, count) {
    "use strict";
    cssFile.usageResults.push({
        htmlFile: htmlFile,
        matchingSelectors: [{
            count: count,
            selector: selector
        }]
    });
}
function addSelectorToExistingUsage(usageResult, selector, count) {
    "use strict";
    usageResult.matchingSelectors.push({
        selector: selector,
        count: count
    });
}
//#endregion 
