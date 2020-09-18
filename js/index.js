function highlightList(jsArray, index1, index2) {
    for (var i = index1; i <= index2; i++) {
        jsArray.highlight(i);
    }
}