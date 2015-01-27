// definitions for https://github.com/reworkcss/css
declare module "css" {
    export function parse(code: string, options?: any):ICss;

    export function stringify(object: any, options?: any);

    export interface IStart {
        line: number;
        column: number;
    }

    export interface IEnd {
        line: number;
        column: number;
    }

    export interface IPosition {
        start: IStart;
        end: IEnd;
    }

    export interface IDeclaration {
        type: string;
        property: string;
        value: string;
        position: IPosition;
    }

    export interface IRule {
        type: string;
        selectors: string[];
        declarations: IDeclaration[];
        position: IPosition;
    }

    export interface IStylesheet {
        rules: IRule[];
    }

    export interface ICss {
        type: string;
        stylesheet: IStylesheet;
    }

}