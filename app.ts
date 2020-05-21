interface highlightInput {
    selector: string;
    searchTerm: string;
    highlightClass?: string;
    highlightStyle?: object;
    caseSensitive?: boolean;
    debounceTime?: number;
}

const highlightClassIdentifier = 'hlJS' + Math.round(Math.random() * 1000);

class HighlightJS implements highlightInput {
    continuousKeyActivity = false;
    previousKeyStrokeMilliSecs = 0;
    currentSearchTerm = '';
    selector = '';
    searchTerm = '';
    highlightTag: any;
    regExpValue?: RegExp;
    caseSensitive = false;
    debounceTime = 500;
    _count = 0;
    validInputData = true;
    specialCharacters = '\\`~!@#$%^&*()_-=+[{]}\\|;:\'",<.>/?';
    charactersToBeSanitized = ['\\', '.', '?', '+', '^', '*', '{', '}', '$', '[', ']', '|', '-', '=', '!', '(', ')', '_'];

    constructor() {}

    get count() {
        return this._count;
    }

    highlight(inputObject: highlightInput, recallAfterDebounce = false) {
        if (inputObject.searchTerm === undefined) {
            this.validInputData = false;
            console.error('Search Keyword is missing');
        }
        if (inputObject.selector === undefined) {
            this.validInputData = false;
            console.error('Target reference is missing');
        }
        if (this.validInputData) {
            if (!recallAfterDebounce) {
                this.currentSearchTerm = inputObject.searchTerm;
            }
            if (inputObject.debounceTime !== undefined) {
                this.debounceTime = inputObject.debounceTime;
            }
            const currentMilliSec = new Date().getSeconds() * 1000 + new Date().getMilliseconds();
            const currentKeyStrokeMilliSecs = (currentMilliSec < this.previousKeyStrokeMilliSecs) ? currentMilliSec + 60000 : currentMilliSec;
            if (currentKeyStrokeMilliSecs - this.previousKeyStrokeMilliSecs >= this.debounceTime) {
                if (this.currentSearchTerm === inputObject.searchTerm) {
                    this.searchTerm = inputObject.searchTerm;
                    this.previousKeyStrokeMilliSecs = (currentKeyStrokeMilliSecs > 60000) ? currentKeyStrokeMilliSecs - 60000 : currentKeyStrokeMilliSecs;
                    this.init(inputObject);
                }
            } else {
                this.continuousKeyActivity = true;
                setTimeout(() => {
                    this.highlight(inputObject, true);
                }, this.debounceTime);
            }
        }
    }

    init(inputObject: highlightInput) {
        this.selector = inputObject.selector;
        const querySelector: HTMLElement | null = document.querySelector(this.selector);
        if (querySelector !== null) {
            const sourceData: HTMLElement = querySelector;
            this.resetContent(sourceData);
            if (this.searchTerm !== '') {
                const nodes = sourceData;
                this.highlightTag = document.createElement('span');

                this.highlightTag.classList.add(highlightClassIdentifier);
                if (inputObject.highlightClass !== undefined) {
                    const classData = inputObject.highlightClass.split(' ');
                    for (const clsData of classData) {
                        if (clsData !== '') {
                            this.highlightTag.classList.add(clsData);
                        }
                    }
                }
                if (inputObject.highlightStyle !== undefined) {
                    for (const i of Object.keys(inputObject.highlightStyle)) {
                        // @ts-ignore
                        this.highlightTag.style[i] = inputObject.highlightStyle[i] as string;
                    }
                }
                if (inputObject.caseSensitive !== undefined && inputObject.caseSensitive === true) {
                    this.caseSensitive = true;
                }
                this.highlightTag.textContent = this.searchTerm;
                this.regExpValue = this.sanitizeRegExp(this.searchTerm);
                this._count = 0;
                this.currentNode(nodes);
            }
        }
    }

    currentNode(nodes: any) {
        if (nodes.children.length > 0) {
            for (const node of nodes.children) {
                this.currentNode(node);
            }
        }
        this.highlightTagContents(nodes);
    }

    removeDuplicateCharacters(string: string) {
        return string.split('').filter((item, pos, self) => {
            return self.indexOf(item) == pos;
        }).join('');
    }

    sanitizeRegExp(searchTerm: string) {
        searchTerm = this.removeDuplicateCharacters(searchTerm);
        let regExpData: any = searchTerm;
        let flags = this.caseSensitive ? 'g' : 'gi';
        const vulnerableCharacters = [];
        for (let j = 0, j1 = this.charactersToBeSanitized.length - 1; j <= this.charactersToBeSanitized.length / 2; j++, j1--) {
            if (j1 < j) {
                break;
            }
            for (let i = 0, i1 = searchTerm.length - 1; i <= searchTerm.length / 2; i++, i1--) {
                if (i1 < i) {
                    break;
                }
                if (this.charactersToBeSanitized[j] === searchTerm[i] || this.charactersToBeSanitized[j1] === searchTerm[i1]) {
                    if (this.charactersToBeSanitized[j] === searchTerm[i]) {
                        vulnerableCharacters.push(searchTerm[i]);
                    }
                    if (this.charactersToBeSanitized[j1] === searchTerm[i1]) {
                        vulnerableCharacters.push(searchTerm[i1]);
                    }
                    break;
                }
            }
        }
        if (vulnerableCharacters.length > 0) {
            for (const i of vulnerableCharacters) {
                regExpData = regExpData.split(new RegExp('\\' + i));
                regExpData = regExpData.join('\\' + i);
            }
        }
        return new RegExp(regExpData, flags);
    }

    highlightTagContents(node: any) {
        let i;
        let nodeData = '';
        for (i = 0; i < node.childNodes.length; i++) {
            const n = node.childNodes[i];
            if (n.nodeValue !== null) {
                let textData = n.nodeValue;
                while (i + 1 < node.childNodes.length && node.childNodes[i + 1].nodeValue !== null) {
                    textData += node.childNodes[++i].nodeValue;
                }
                const splitedData = textData.split(this.regExpValue);
                if (splitedData.length > 1) {
                    let data = '';
                    let i;
                    for (i = 0; i < splitedData.length - 1; i++) {
                        data += splitedData[i] + this.highlightTag.outerHTML;
                        this._count++;
                    }
                    if (i > 0) {
                        data += splitedData[i];
                        nodeData += data;
                    }
                } else {
                    nodeData += textData;
                }
            } else {
                nodeData += n.outerHTML;
            }
        }
        node.innerHTML = nodeData;
    }

    resetContent(sourceData: HTMLElement) {
        const existingHighlightedData: NodeListOf<HTMLElement> = sourceData.querySelectorAll('.' + highlightClassIdentifier);
        existingHighlightedData.forEach((element: HTMLElement) => {
            if (element.textContent !== null) {
                element.replaceWith(element.textContent);
            }
        });
        this._count = 0;
    }
}
let hlJS, hljs, $hlJS, $hljs;
hlJS = hljs = $hlJS = $hljs = new HighlightJS();