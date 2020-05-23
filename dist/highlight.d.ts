interface highlightInput {
    selector: string;
    searchTerm: string;
    highlightClass?: string;
    highlightStyle?: object;
    caseSensitive?: boolean;
    debounceTime?: number;
}
declare const highlightClassIdentifier: string;
declare class HighlightJS implements highlightInput {
    previousKeyStrokeMilliSecs: number;
    currentSearchTerm: string;
    selector: string;
    searchTerm: string;
    sanitizedSearchTerm: string;
    highlightTag: HTMLSpanElement | null;
    caseSensitive: boolean;
    debounceTime: number;
    shortcutEventListener: any;
    isShortcutEventListener: boolean;
    _count: number;
    validInputData: boolean;
    specialCharacters: string;
    constructor();
    get count(): number;
    disableBrowserShortcutForFind(disable?: boolean): void;
    highlight(inputObject: highlightInput, recallAfterDebounce?: boolean): void;
    init(inputObject: highlightInput): void;
    sanitizeSearchTerm(): void;
    currentNode(nodes: any): void;
    highlightTagContents(node: any): void;
    resetContent(sourceData: HTMLElement): void;
}
declare let hlJS: any, hljs: any, $hlJS: any, $hljs: any;
