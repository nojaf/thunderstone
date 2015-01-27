import grunt = require("grunt");
import css = require("css");
export function loadCssFiles(patterns:string[]):ICssFile[] {
    var cssPaths: string[] = grunt.file.expand(patterns);
    var cssFiles: ICssFile[] = [];
    for (var i: number = 0; i < cssPaths.length; i++) {
        cssFiles.push(parseCssFile(cssPaths[i]));
    }
    return cssFiles;
}

function parseCssFile(path: string): ICssFile {
    var cssContent: string = grunt.file.read(path);
    var cssObject: css.ICss = css.parse(cssContent);
    var cssFile: ICssFile = {
        relativePath: path,
        selectors:getSelectorsFromCssObject(cssObject)
    };
    return cssFile;
}

function getSelectorsFromCssObject(cssObject:css.ICss):string[] {
    var selectors: string[] = [];
    for (var r: number = 0; r < cssObject.stylesheet.rules.length; r++) {
        var rule: css.IRule = cssObject.stylesheet.rules[r];
        selectors = selectors.concat(rule.selectors);
    }
    return selectors;
}