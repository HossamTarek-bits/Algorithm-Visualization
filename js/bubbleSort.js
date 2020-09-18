// Init JSAV and Array for the first time
var js = new JSAV("container");
var array = [Math.floor(Math.random() * 10)];
// Create a randomly array elements on every page load
for (var i = 1; i < 10; i++) {
    array.push(Math.floor(Math.random() * 10));
}
// Create a JSAV array
var jsArray = js.ds.array(array, { indexed: true });
// Create a JSAV Pointer
var jPointer = js.pointer("", jsArray.index(0));
js.displayInit();
// Bubble Sort Algorthim
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10 - i; j++) {
        jPointer.target(jsArray.index(j));
        js.step();
        if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            jsArray.swap(j, j + 1, { arrow: true, highlight: true });
        }
        js.step();
    }
}
js.recorded();
