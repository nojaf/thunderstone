/// <reference path="../../tasks/interface.ts" />
/// <reference path="../../typings/tsd.d.ts" />
import cssSelector = require("../../tasks/cssProcessor");
describe("css processor tests",(): void => {
    it("should contains 5 css selectors",(): void => {
        var cssResults: ICssFile[] = cssSelector.loadCssFiles(["tests/css/fiveSelectors.css"]);
        expect(cssResults[0].selectors.length).toBe(5);
    });
});