let input = require("fs").readFileSync("example.txt").toString().split("\n");
var a = parseInt(input[0]);
var b = parseInt(input[1]);
console.log(a + b);
