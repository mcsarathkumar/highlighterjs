## HighlightJS

- [x] Want to provide functionality to your users to search & highlight any content in full / particular portion of webpage ?
- [x] Want case sensitive search & highlight ?
- [x] Want to apply customized styles on highlighted content ?
- [x] Want to override browser search with customized search & highlight ?
- [x] Need Library without dependencies and avoid code mess ?

Here is [HighlightJS](dist/highlight.js) - A single line of Code can solve all the above problems

```javascript
<script src="https://github.com/mcsarathkumar/highlightjs/blob/master/dist/highlight.js"></script>
<script>
$hljs.disableBrowserShortcutForFind(); // disabled browser find shortcuts - Optional
$hljs.highlight({
    searchTerm: 'search me', // search keyword
    selector: '#home' // HTML tag ID or body tag by default - Optional
});
</script>
```

