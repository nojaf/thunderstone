/// <reference path="../../tasks/interface.ts" />
/// <reference path="../../tasks/thunderstoneprocessor.ts" />
/// <reference path="../../typings/tsd.d.ts" />
import thunderstoneProcessor = require("../../tasks/thunderstoneProcessor");
describe("thundestone processor tests",(): void => {
    it("should have an selector match for the html file",(): void => {
        var htmlFiles: IHtmlFile[] = [{
            content: "<html><head><link href='test.css' rel='stylesheet' /></head><body><h1>My title</h1></body><html>",
            relativePath: "",
            selectorResults:[]
        }];
        var cssFiles: ICssFile[] = [{
            fileName: "test.css",
            relativePath: "",
            selectors: ["h1"],
            usageResults:[]
        }];
        thunderstoneProcessor.parseHtmlFiles(htmlFiles, cssFiles);

        expect(htmlFiles[0].selectorResults.length).toBe(1);
    });

    it("should have a html file using a selector from the css file",(): void => {
        var cssFiles: ICssFile[] = [{
            fileName: "test.css",
            relativePath: "",
            selectors: ["h1"],
            usageResults:[]
        }];

        var htmlFiles: IHtmlFile[] = [{
            content: "<html><head><link href='test.css' rel='stylesheet' /></head><body><h1>My title</h1></body><html>",
            relativePath: "",
            selectorResults: []
        }];

        thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);

        expect(cssFiles[0].usageResults.length).toBe(1);
    });

    it("should have a html file using a selector used twice from the css file",(): void => {
        var cssFiles: ICssFile[] = [{
            fileName: "test.css",
            relativePath: "",
            selectors: ["h1"],
            usageResults: []
        }];

        var htmlFiles: IHtmlFile[] = [{
            content: "<html><head><link href='test.css' rel='stylesheet' /></head><body><h1>My title</h1><h1>Second h1</h1></body><html>",
            relativePath: "",
            selectorResults: []
        }];

        thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);

        expect(cssFiles[0].usageResults[0].matchingSelectors[0].count).toBe(2);
    });

    it("should have an htlm using multiple selectors from the css file",(): void => {
        var cssFiles: ICssFile[] = [{
            fileName: "test.css",
            relativePath: "",
            selectors: ["h1", "p"],
            usageResults: []
        }];

        var htmlFiles: IHtmlFile[] = [{
            content: "<html><head><link href='test.css' rel='stylesheet' /></head><body><h1>My title</h1><p>Content here</p></body><html>",
            relativePath: "",
            selectorResults: []
        }];

        thunderstoneProcessor.parseCssFiles(cssFiles, htmlFiles);

        expect(cssFiles[0].usageResults[0].matchingSelectors.length).toBe(2);
    });
});