"use strict";
interface IThunderStoneConfig {
    html: string[];
    css: string[];
    outputDir: string;
}

interface IHtmlFile {
    relativePath: string;
    fileName: string;
    content: string;
    selectorResults?: ISelectorResult[];
    id: string;
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
    id: string;
}

interface IHtmlUsageResult {
    htmlFile: IHtmlFile;
    matchingSelectors: IHtmlCssSelectorMatch[];
}

interface IHtmlCssSelectorMatch {
    selector: string;
    count: number;
}