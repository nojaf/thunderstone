"use strict";
interface IThunderStoneConfig {
    html: string[];
    css: string[];
    output: string;
}

interface IHtmlFile {
    relativePath: string;
    content: string;
    foundSelectors:string[];
}

interface ICssFile {
    selectors: string[];
    relativePath: string;
}