interface HighlightJSInterface {
    searchTerm: string;
    selector?: string;
    highlightClass?: string;
    highlightStyle?: object;
    caseSensitive?: boolean;
    debounceTime?: number;
}
declare function isUndefined(params: any): boolean;
declare function isNull(params: any): boolean;
declare function isEmpty(params: any): boolean;
declare const highlightClassIdentifier: string;
declare class HighlightJS implements HighlightJSInterface {
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
    private _count;
    validInputData: boolean;
    specialCharacters: string;
    get count(): number;
    constructor();
    highlight(inputObject: HighlightJSInterface, recallAfterDebounce?: boolean): void;
    init(inputObject: HighlightJSInterface): void;
    sanitizeSearchTerm(): void;
    currentNode(nodes: any): void;
    highlightTagContents(node: any): void;
    resetContent(sourceData: HTMLElement): void;
    disableCtrlFandFocusCustomInput(input?: string | boolean): void;
}
declare let hlJS: any, hljs: any, $hlJS: any, $hljs: any;
