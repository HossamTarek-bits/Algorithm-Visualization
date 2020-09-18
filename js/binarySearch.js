// Init JSAV and Array for the first time
var js = new JSAV("container");
var array = [Math.floor(Math.random() * 10)];
// Create a randomly increasing array elements on every page load
for (var i = 1; i < 10; i++) {
    array.push(Math.floor(Math.random() * 10) + array[i - 1]);
}
// Create an JSAV array
var jsArray = js.ds.array(array, { indexed: true });
// Wait for the play button to be pressed
$(".startButton, .start").click(function (e) {
    // delete any prev JSAV elements and create them again
    $(".jsavcanvas").remove();
    $(".jsavcontrols").remove();
    $("<div class = 'jsavcanvas'></div>").insertAfter(".jsavoutput");
    $("<div class = 'jsavcontrols'></div>").insertAfter(".jsavcanvas");
    js = new JSAV("container");
    jsArray = js.ds.array(array, { indexed: true });
    var middleIndex;
    var middlePointer;
    // get the number to search for from input HTML element
    var requiredSearch = parseInt($("#requiredNumber").val());
    // if user didn't enter a valid number create one randomly
    if (isNaN(requiredSearch)) {
        requiredSearch = array[Math.floor(Math.random() * 10)];
    }
    var left = 0;
    var right = jsArray.size() - 1;
    js.umsg("The number to search for is " + requiredSearch);
    highlightList(jsArray, left, right);
    js.displayInit();
    // Binary Search Algo
    while (left <= right) {
        middleIndex = Math.floor((right + left) / 2);
        // Create JSAV Pointer pointing to the middle index
        if (middlePointer === undefined) {
            middlePointer = js.pointer("", jsArray.index(middleIndex));
            // changes the index of the pointer
        } else {
            middlePointer.target(jsArray.index(middleIndex));
        }
        js.step();
        if (array[middleIndex] < requiredSearch) {
            left = middleIndex + 1;
        } else if (array[middleIndex] > requiredSearch) {
            right = middleIndex - 1;
        } else {
            jsArray.unhighlight();
            jsArray.highlight(middleIndex);
            js.step();
            break;
        }
        jsArray.unhighlight();
        highlightList(jsArray, left, right);
        js.step();
    }
    if (array[middleIndex] != requiredSearch) {
        js.umsg("Number is not in the array");
    } else {
        js.umsg("Number exists at index " + middleIndex);
    }

    js.recorded();
});
