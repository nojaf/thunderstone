"use strict";
interface IThunderStoneConfig {
    html: string[];
    css: string[];
    output: string;
}

interface IHtmlFile {
    relativePath: string;
    content: string;
    selectorResults?:ISelectorResult[];
}

interface ISelectorResult {
    cssFile: ICssFile;
    matchingSelectors:string[];
}

interface ICssFile {
    selectors: string[];
    relativePath: string;
    fileName: string;
    usageResults: IHtmlUsageResult[];
}

interface IHtmlUsageResult {
    htmlFile: IHtmlFile;
    matchingSelectors: IHtmlCssSelectorMatch[];
}

interface IHtmlCssSelectorMatch {
    selector: string;
    count: number;
}