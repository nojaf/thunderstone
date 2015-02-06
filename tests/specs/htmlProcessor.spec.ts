/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../tasks/interface.ts" />
"use strict";
import htmlProcessor = require("../../tasks/htmlProcessor");
describe("htmlProcessor tests", (): void => {
    it("should contain an h1",(): void => {
        var results: IHtmlFile[] = htmlProcessor.loadHtmlFiles(["tests/html/oneH1tag.html"]);
        expect(results[0].content).toContain("<h1>My title</h1>");
    });
});