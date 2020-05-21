"use strict";
var highlightClassIdentifier = 'hIgHliGhTjS';
var Highlight = /** @class */ (function () {
    function Highlight(inputObject) {
        this.selector = '';
        this.searchTerm = '';
        // specialCharacters = '\\`~!@#$%^&*()_-=+[{]}\\|;:\'",<.>/?';
        this.charactersToBeSanitized = ['\\', '.', '?', '+', '^', '*', '{', '}', '$', '[', ']', '|', '-', '=', '!', '(', ')', '_'];
        if (inputObject) {
            this.selector = inputObject.selector;
            this.searchTerm = inputObject.searchTerm;
            this.init(inputObject);
        }
    }
    Highlight.prototype.init = function (inputObject) {
        var querySelector = document.querySelector(this.selector);
        if (querySelector !== null) {
            var sourceData = querySelector;
            this.resetContent(sourceData);
            if (this.searchTerm !== '') {
                var nodes = sourceData;
                this.highlightSpan = document.createElement('span');
                this.highlightSpan.classList.add(highlightClassIdentifier);
                if (inputObject.highlightClass !== undefined) {
                    this.highlightSpan.classList.add(inputObject.highlightClass);
                }
                if (inputObject.highlightStyle !== undefined) {
                    for (var _i = 0, _a = Object.keys(inputObject.highlightStyle); _i < _a.length; _i++) {
                        var i = _a[_i];
                        // @ts-ignore
                        this.highlightSpan.style[i] = inputObject.highlightStyle[i];
                    }
                }
                this.highlightSpan.textContent = this.searchTerm;
                this.regExpValue = this.sanitizeRegExp(this.searchTerm);
                this.currentNode(nodes);
            }
        }
    };
    Highlight.prototype.currentNode = function (nodes) {
        if (nodes.children.length > 0) {
            for (var _i = 0, _a = nodes.children; _i < _a.length; _i++) {
                var node = _a[_i];
                this.currentNode(node);
            }
        }
        this.highlightTagContents(nodes);
    };
    Highlight.prototype.sanitizeRegExp = function (searchTerm) {
        var regExpData = searchTerm;
        var flags = 'gi';
        var vulnerableCharacters = [];
        for (var j = 0, j1 = this.charactersToBeSanitized.length - 1; j <= this.charactersToBeSanitized.length / 2; j++, j1--) {
            for (var i = 0, i1 = searchTerm.length - 1; i <= searchTerm.length / 2; i++, i1--) {
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
            for (var _i = 0, vulnerableCharacters_1 = vulnerableCharacters; _i < vulnerableCharacters_1.length; _i++) {
                var i = vulnerableCharacters_1[_i];
                regExpData = regExpData.split(new RegExp('\\' + i));
                regExpData = regExpData.join('\\' + i);
                console.log(regExpData);
            }
        }
        return new RegExp(regExpData, flags);
    };
    Highlight.prototype.highlightTagContents = function (node) {
        var i;
        var nodeData = '';
        for (i = 0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];
            if (n.nodeValue !== null) {
                var textData = n.nodeValue;
                while (i + 1 < node.childNodes.length && node.childNodes[i + 1].nodeValue !== null) {
                    textData += node.childNodes[++i].nodeValue;
                }
                var splitedData = textData.split(this.regExpValue);
                if (splitedData.length > 1) {
                    var data = '';
                    var i_1 = void 0;
                    for (i_1 = 0; i_1 < splitedData.length - 1; i_1++) {
                        data += splitedData[i_1] + this.highlightSpan.outerHTML;
                    }
                    if (i_1 > 0) {
                        data += splitedData[i_1];
                        nodeData += data;
                    }
                }
                else {
                    nodeData += textData;
                }
            }
            else {
                nodeData += n.outerHTML;
            }
        }
        node.innerHTML = nodeData;
    };
    Highlight.prototype.resetContent = function (sourceData) {
        var existingHighlightedData = sourceData.querySelectorAll('.' + highlightClassIdentifier);
        existingHighlightedData.forEach(function (element) {
            if (element.textContent !== null) {
                element.replaceWith(element.textContent);
            }
        });
    };
    return Highlight;
}());
