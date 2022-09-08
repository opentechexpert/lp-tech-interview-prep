process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function solveMeFirst(a, b) {
  // Hint: Type return a+b below  
}


function main() {
    const a = parseInt(readLine());
    const b = parseInt(readLine());
    const outPutResult = parseInt(readLine());

    const res = solveMeFirst(a, b);
    const log = 'return: ' + res + ', expected: ' + outPutResult

    console.log(outPutResult == res ? '✅ ' + log : '❌ ' + log);
}