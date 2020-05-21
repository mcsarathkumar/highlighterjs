"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var highlightClassIdentifier = 'hlJS' + Math.round(Math.random() * 1000);
var HighlightJS = /** @class */ (function () {
    function HighlightJS() {
        this.continuousKeyActivity = false;
        this.previousKeyStrokeMilliSecs = 0;
        this.currentSearchTerm = '';
        this.selector = '';
        this.searchTerm = '';
        this.caseSensitive = false;
        this.debounceTime = 500;
        this._count = 0;
        this.validInputData = true;
        this.specialCharacters = '\\`~!@#$%^&*()_-=+[{]}\\|;:\'",<.>/?';
        this.charactersToBeSanitized = ['\\', '.', '?', '+', '^', '*', '{', '}', '$', '[', ']', '|', '-', '=', '!', '(', ')', '_'];
    }
    Object.defineProperty(HighlightJS.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    HighlightJS.prototype.highlight = function (inputObject, recallAfterDebounce) {
        var _this = this;
        if (recallAfterDebounce === void 0) { recallAfterDebounce = false; }
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
            var currentMilliSec = new Date().getSeconds() * 1000 + new Date().getMilliseconds();
            var currentKeyStrokeMilliSecs = (currentMilliSec < this.previousKeyStrokeMilliSecs) ? currentMilliSec + 60000 : currentMilliSec;
            if (currentKeyStrokeMilliSecs - this.previousKeyStrokeMilliSecs >= this.debounceTime) {
                if (this.currentSearchTerm === inputObject.searchTerm) {
                    this.searchTerm = inputObject.searchTerm;
                    this.previousKeyStrokeMilliSecs = (currentKeyStrokeMilliSecs > 60000) ? currentKeyStrokeMilliSecs - 60000 : currentKeyStrokeMilliSecs;
                    this.init(inputObject);
                }
            }
            else {
                this.continuousKeyActivity = true;
                setTimeout(function () {
                    _this.highlight(inputObject, true);
                }, this.debounceTime);
            }
        }
    };
    HighlightJS.prototype.init = function (inputObject) {
        var e_1, _a, e_2, _b;
        this.selector = inputObject.selector;
        var querySelector = document.querySelector(this.selector);
        if (querySelector !== null) {
            var sourceData = querySelector;
            this.resetContent(sourceData);
            if (this.searchTerm !== '') {
                var nodes = sourceData;
                this.highlightTag = document.createElement('span');
                this.highlightTag.classList.add(highlightClassIdentifier);
                if (inputObject.highlightClass !== undefined) {
                    var classData = inputObject.highlightClass.split(' ');
                    try {
                        for (var classData_1 = __values(classData), classData_1_1 = classData_1.next(); !classData_1_1.done; classData_1_1 = classData_1.next()) {
                            var clsData = classData_1_1.value;
                            if (clsData !== '') {
                                this.highlightTag.classList.add(clsData);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (classData_1_1 && !classData_1_1.done && (_a = classData_1.return)) _a.call(classData_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (inputObject.highlightStyle !== undefined) {
                    try {
                        for (var _c = __values(Object.keys(inputObject.highlightStyle)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var i = _d.value;
                            // @ts-ignore
                            this.highlightTag.style[i] = inputObject.highlightStyle[i];
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
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
    };
    HighlightJS.prototype.currentNode = function (nodes) {
        var e_3, _a;
        if (nodes.children.length > 0) {
            try {
                for (var _b = __values(nodes.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    this.currentNode(node);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        this.highlightTagContents(nodes);
    };
    HighlightJS.prototype.removeDuplicateCharacters = function (string) {
        return string.split('').filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        }).join('');
    };
    HighlightJS.prototype.sanitizeRegExp = function (searchTerm) {
        var e_4, _a;
        searchTerm = this.removeDuplicateCharacters(searchTerm);
        var regExpData = searchTerm;
        var flags = this.caseSensitive ? 'g' : 'gi';
        var vulnerableCharacters = [];
        for (var j = 0, j1 = this.charactersToBeSanitized.length - 1; j <= this.charactersToBeSanitized.length / 2; j++, j1--) {
            if (j1 < j) {
                break;
            }
            for (var i = 0, i1 = searchTerm.length - 1; i <= searchTerm.length / 2; i++, i1--) {
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
            try {
                for (var vulnerableCharacters_1 = __values(vulnerableCharacters), vulnerableCharacters_1_1 = vulnerableCharacters_1.next(); !vulnerableCharacters_1_1.done; vulnerableCharacters_1_1 = vulnerableCharacters_1.next()) {
                    var i = vulnerableCharacters_1_1.value;
                    regExpData = regExpData.split(new RegExp('\\' + i));
                    regExpData = regExpData.join('\\' + i);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (vulnerableCharacters_1_1 && !vulnerableCharacters_1_1.done && (_a = vulnerableCharacters_1.return)) _a.call(vulnerableCharacters_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return new RegExp(regExpData, flags);
    };
    HighlightJS.prototype.highlightTagContents = function (node) {
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
                        data += splitedData[i_1] + this.highlightTag.outerHTML;
                        this._count++;
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
    HighlightJS.prototype.resetContent = function (sourceData) {
        var existingHighlightedData = sourceData.querySelectorAll('.' + highlightClassIdentifier);
        existingHighlightedData.forEach(function (element) {
            if (element.textContent !== null) {
                element.replaceWith(element.textContent);
            }
        });
        this._count = 0;
    };
    return HighlightJS;
}());
var hlJS, hljs, $hlJS, $hljs;
hlJS = hljs = $hlJS = $hljs = new HighlightJS();
