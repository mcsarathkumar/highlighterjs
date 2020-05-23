interface highlightInput {
    selector: string;
    searchTerm: string;
    highlightClass?: string;
    highlightStyle?: object;
    caseSensitive?: boolean;
    debounceTime?: number;
    allowSpecialCharacters?: boolean;
}
declare const highlightClassIdentifier: string;
declare class HighlightJS implements highlightInput {
    previousKeyStrokeMilliSecs: number;
    currentSearchTerm: string;
    selector: string;
    searchTerm: string;
    highlightTag: any;
    regExpValue?: RegExp;
    caseSensitive: boolean;
    debounceTime: number;
    shortcutEventListener: any;
    isShortcutEventListener: boolean;
    _count: number;
    allowSpecialCharacters: boolean;
    validInputData: boolean;
    specialCharacters: string;
    charactersToBeSanitized: string[];
    constructor();
    get count(): number;
    disableBrowserShortcutForFind(disable?: boolean): void;
    highlight(inputObject: highlightInput, recallAfterDebounce?: boolean): void;
    init(inputObject: highlightInput): void;
    currentNode(nodes: any): void;
    removeDuplicateCharacters(string: string): string;
    sanitizeRegExp(searchTerm: string): RegExp;
    highlightTagContents(node: any): void;
    resetContent(sourceData: HTMLElement): void;
}
declare let hlJS: any, hljs: any, $hlJS: any, $hljs: any;
