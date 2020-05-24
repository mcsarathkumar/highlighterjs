<h2 align="center">HighlightJS</h2>

<p align="center">
  Simple, sleek and powerful library for customized text highlight in webpage
</p>

## Status

[![npm version](https://img.shields.io/npm/v/@mcsarathkumar/highlightjs.svg)](https://www.npmjs.com/package/@mcsarathkumar/highlightjs)

## Quick start

Several quick start options are available:

- [Download the latest release.](https://github.com/mcsarathkumar/highlightjs/archive/v1.0.1.zip)
- Clone the repo: `git clone https://github.com/mcsarathkumar/highlightjs.git`
- Install with [npm](https://www.npmjs.com/package/@mcsarathkumar/highlightjs): `npm install @mcsarathkumar/highlightjs`
- Install with [yarn](https://yarnpkg.com/package/@mcsarathkumar/highlightjs): `yarn add @mcsarathkumar/highlightjs`

## Questionnaire

- Want to provide functionality to your users to search & highlight any content in full / particular portion of webpage ?
- Want case sensitive search & highlight ?
- Want to apply customized styles on highlighted content ?
- Want to override browser search with customized search & highlight ?
- Need Library without dependencies and avoid code mess ?

## Solution

Here is [HighlightJS](dist/highlight.js) - A single line of Code can solve all the above problems

```javascript
<input type="text" id="searchTerm">
<script src="https://cdn.jsdelivr.net/npm/@mcsarathkumar/highlightjs/dist/highlight.js"></script>
<script>
document.querySelector('#searchTerm').addEventListener('keyup', () => {
  const searchTerm = document.getElementById('searchTerm').value;
  $hljs.highlight({searchTerm: 'search me'});
});
</script>
```

## Demo

Please check all components we have in action at https://mcsarathkumar.github.io/highlightjs/demo.html

## API Accessors

`$hljs.highlight()` (or) `hljs.highlight()` (or) `$hlJS.highlight()` (or) `hlJS.highlight()` 

## API Inputs for highlight()

| Input            | isRequired | Datatype  | Usage                                                                                                              | Default                                                   | Example                                                                                                                                                                                                                                     |
| ---------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `searchTerm`     | required   | `string`  | Searches the given text in the target area                                                                         |                                                           | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me'`<br>`})`                                                                                                                                                                        |
| `selector`       | optional   | `string`  | Specify target in your webpage to search <br>and highlight. Tag's ID to target, body<br> tag is focused by default | `body`                                                    | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me',`<br>&nbsp;&nbsp;`selector: '#container'`<br>`})`                                                                                                                               |
| `highlightClass` | optional   | `string`  | CSS class to be applied on the highlighted content                                                                 |                                                           | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me',`<br>&nbsp;&nbsp;`highlightClass: 'bg-white text-primary'`<br>`})`                                                                                                              |
| `highlightStyle` | optional   | `object`  | CSS style to be applied on the highlighted content                                                                 | `{`<br>&nbsp;&nbsp;`'background-color': '#FFF77D'`<br>`}` | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me',`<br>&nbsp;&nbsp;`highlightStyle: {`<br>&nbsp;&nbsp;&nbsp;&nbsp;`'background-color': 'aliceblue',`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`color: 'black'`<br>&nbsp;&nbsp;`}`<br>`})` |
| `caseSensitive`  | optional   | `boolean` | Case sensitive search                                                                                              | `false`                                                   | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me',`<br>&nbsp;&nbsp;`caseSensitive: true`<br>`})`                                                                                                                                  |
| `debounceTime`   | optional   | `number`  | On continuous keystroke in search term, <br>time (in milli seconds) to wait before <br>executing search            | `50`                                                      | `$hljs.highlight({`<br>&nbsp;&nbsp;`searchTerm: 'search me',`<br>&nbsp;&nbsp;`debounceTime: 100`<br>`})`                                                                                                                                    |
***


## API Output

| Output | Datatype | Usage                               |
| ------ | -------- | ----------------------------------- |
| count  | `number` | Count of number of matched contents |
| disableCtrlFandFocusCustomInput(`arg = true`) | `function` | When the `arg = #searchTerm` (input tag id) Browser's `Ctrl + F` or `F3` shortcuts properties <br> are overridden and focussd to `#searchTerm` on pressing shortcuts, when `arg = true`, Browser's<br> shortcuts are disabled,  `arg = false` Enables browser shortcuts, if it was disabled by HighlightJS |
***

