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
function isUndefined(params) {
    return params === undefined;
}
function isNull(params) {
    return params === null;
}
function isEmpty(params) {
    return isUndefined(params) || isNull(params);
}
var highlightClassIdentifier = 'hlJS' + Math.round(Math.random() * 1000);
var HighlightJS = /** @class */ (function () {
    function HighlightJS() {
        this.previousKeyStrokeMilliSecs = 0;
        this.currentSearchTerm = '';
        this.selector = '';
        this.searchTerm = '';
        this.sanitizedSearchTerm = '';
        this.highlightTag = null;
        this.caseSensitive = false;
        this.debounceTime = 50;
        this.isShortcutEventListener = false;
        this._count = 0;
        this.validInputData = true;
        this.specialCharacters = '`~!@#$%^&*()_-=+[{]}\\|;:\'"<>/?.';
    }
    Object.defineProperty(HighlightJS.prototype, "count", {
        get: function () { return this._count; },
        enumerable: false,
        configurable: true
    });
    HighlightJS.prototype.highlight = function (inputObject, recallAfterDebounce) {
        var _this = this;
        if (recallAfterDebounce === void 0) { recallAfterDebounce = false; }
        if (typeof inputObject.searchTerm !== 'string') {
            this.validInputData = false;
            console.error('Search Keyword is missing');
        }
        if (this.validInputData) {
            if (!recallAfterDebounce) {
                this.currentSearchTerm = inputObject.searchTerm;
            }
            if (typeof inputObject.debounceTime === 'number') {
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
                setTimeout(function () {
                    _this.highlight(inputObject, true);
                }, this.debounceTime);
            }
        }
    };
    HighlightJS.prototype.init = function (inputObject) {
        var e_1, _a, e_2, _b;
        this.selector = (typeof inputObject.selector === 'string' && inputObject.selector.length > 1 && inputObject.selector[0] === '#') ? inputObject.selector : 'body';
        var querySelector = document.querySelector(this.selector);
        if (querySelector !== null) {
            var sourceData = querySelector;
            this.resetContent(sourceData);
            if (this.searchTerm !== '') {
                var nodes = sourceData;
                this.highlightTag = document.createElement('span');
                this.highlightTag.classList.add(highlightClassIdentifier);
                if (typeof inputObject.highlightClass === 'string' && inputObject.highlightClass.length > 0) {
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
                if ((!isEmpty(inputObject.highlightStyle) && typeof inputObject.highlightStyle === 'object')) {
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
                if (isEmpty(inputObject.highlightStyle) && isEmpty(inputObject.highlightClass)) {
                    this.highlightTag.style.backgroundColor = '#FFF77D';
                }
                if (typeof inputObject.caseSensitive === 'boolean' && inputObject.caseSensitive) {
                    this.caseSensitive = true;
                }
                this.sanitizeSearchTerm();
                this._count = 0;
                this.currentNode(nodes);
            }
        }
    };
    HighlightJS.prototype.sanitizeSearchTerm = function () {
        var finalString = '';
        for (var i = 0; i < this.searchTerm.length; i++) {
            for (var j = 0; j < this.specialCharacters.length; j++) {
                if (this.searchTerm[i] === this.specialCharacters[j]) {
                    finalString += '\\';
                }
            }
            finalString += this.searchTerm[i];
        }
        this.sanitizedSearchTerm = finalString;
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
    HighlightJS.prototype.highlightTagContents = function (node) {
        var i;
        var nodeData = '';
        var textData;
        var finalString;
        var position;
        for (i = 0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];
            if (n.nodeValue !== null && this.highlightTag !== null) {
                textData = n.nodeValue;
                while (i + 1 < node.childNodes.length && node.childNodes[i + 1].nodeValue !== null) {
                    textData += node.childNodes[++i].nodeValue;
                }
                var searchResult = (this.caseSensitive) ? textData.search(this.sanitizedSearchTerm) : textData.toLowerCase().search(this.sanitizedSearchTerm.toLowerCase());
                if (searchResult !== -1) {
                    finalString = '';
                    while (true) {
                        position = (this.caseSensitive) ? textData.indexOf(this.searchTerm) : textData.toLowerCase().indexOf(this.searchTerm.toLowerCase());
                        if (position === -1) {
                            break;
                        }
                        this.highlightTag.textContent = textData.substr(position, this.searchTerm.length);
                        finalString += textData.substr(0, position) + this.highlightTag.outerHTML;
                        textData = textData.substr(position + this.searchTerm.length);
                        this._count++;
                    }
                    finalString += textData;
                    nodeData += finalString;
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
    HighlightJS.prototype.disableCtrlFandFocusCustomInput = function (input) {
        if (input === void 0) { input = true; }
        if (input !== false && !this.isShortcutEventListener) {
            this.shortcutEventListener = window.addEventListener('keydown', function (event) {
                if (event.code === 'F3' || ((event.ctrlKey || event.metaKey) && event.code === 'KeyF')) {
                    event.preventDefault();
                    if (typeof input === 'string' && input.length > 0) {
                        var identifier = document.getElementById((input[0] === '#') ? input.substr(1) : input);
                        if (identifier) {
                            identifier.focus();
                        }
                        else {
                            console.error('Invalid ID given for focussing input tag');
                        }
                    }
                }
            });
            this.isShortcutEventListener = true;
        }
        else {
            if (this.isShortcutEventListener) {
                window.removeEventListener('keydown', this.shortcutEventListener);
                this.isShortcutEventListener = false;
            }
        }
    };
    return HighlightJS;
}());
var hlJS, hljs, $hlJS, $hljs;
hlJS = hljs = $hlJS = $hljs = new HighlightJS();
