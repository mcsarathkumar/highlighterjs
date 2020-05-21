interface highlightInput {
    selector: string;
    searchTerm: string;
    highlightClass?: string;
    highlightStyle?: object;
}

const highlightClassIdentifier = 'hIgHliGhTjS'

class Highlight implements highlightInput {
    selector = '';
    searchTerm = '';
    highlightSpan: any;
    regExpValue?: RegExp;
    // specialCharacters = '\\`~!@#$%^&*()_-=+[{]}\\|;:\'",<.>/?';
    charactersToBeSanitized = ['\\', '.', '?', '+', '^', '*', '{', '}', '$', '[', ']', '|', '-', '=', '!', '(', ')', '_'];

    constructor(inputObject: highlightInput)
    {
        if (inputObject) {
            this.selector = inputObject.selector;
            this.searchTerm = inputObject.searchTerm;
            this.init(inputObject);
        }
    }

    init(inputObject: highlightInput) {
        const querySelector: HTMLElement | null = document.querySelector(this.selector);
        if (querySelector !== null) {
            const sourceData: HTMLElement = querySelector;
            this.resetContent(sourceData);
            if (this.searchTerm !== '') {
                const nodes = sourceData;
                this.highlightSpan = document.createElement('span');
                this.highlightSpan.classList.add(highlightClassIdentifier);
                if (inputObject.highlightClass !== undefined) {
                    this.highlightSpan.classList.add(inputObject.highlightClass);
                }
                if (inputObject.highlightStyle !== undefined) {
                    for (let i of Object.keys(inputObject.highlightStyle)) {
                        // @ts-ignore
                        this.highlightSpan.style[i] = inputObject.highlightStyle[i] as string;
                    }
                }
                this.highlightSpan.textContent = this.searchTerm;
                this.regExpValue = this.sanitizeRegExp(this.searchTerm);
                this.currentNode(nodes);
            }
        }
    }

    currentNode(nodes: any) {
        if (nodes.children.length > 0) {
            for (let node of nodes.children) {
                this.currentNode(node);
            }
        }
        this.highlightTagContents(nodes);
    }

    sanitizeRegExp(searchTerm: string) {
        let regExpData: any = searchTerm;
        let flags = 'gi';
        const vulnerableCharacters = [];
        for (let j = 0, j1 = this.charactersToBeSanitized.length - 1; j <= this.charactersToBeSanitized.length / 2; j++, j1--) {
            for (let i = 0, i1 = searchTerm.length - 1; i <= searchTerm.length / 2; i++, i1--) {
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
            for (let i of vulnerableCharacters) {
                regExpData = regExpData.split(new RegExp('\\' + i));
                regExpData = regExpData.join('\\' + i);
                console.log(regExpData);
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
                        data += splitedData[i] + this.highlightSpan.outerHTML;
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
    }
}