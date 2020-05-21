interface highlightInput {
    selector: string;
    searchTerm: string;
    highlightClass?: string;
    highlightStyle?: object;
}
declare const highlightClassIdentifier = "hIgHliGhTjS";
declare class Highlight implements highlightInput {
    selector: string;
    searchTerm: string;
    highlightSpan: any;
    regExpValue?: RegExp;
    charactersToBeSanitized: string[];
    constructor(inputObject: highlightInput);
    init(inputObject: highlightInput): void;
    currentNode(nodes: any): void;
    sanitizeRegExp(searchTerm: string): RegExp;
    highlightTagContents(node: any): void;
    resetContent(sourceData: HTMLElement): void;
}
