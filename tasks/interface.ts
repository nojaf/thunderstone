"use strict";
interface IThunderStoneConfig {
    html: string[];
    css: string[];
    output: string;
}

interface IHtmlFile {
}

interface ICssFile {
    selectors: string[];
    relativePath:string;
}