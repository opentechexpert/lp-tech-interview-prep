const glob = require("glob");
const { spawn } = require("child_process");
const fs = require('fs');
const { join } = require("path");

//Set test file name
//Copy HackerRank test to this file
//This file has the test functions
const testFileName = "test.js"

//Get test script path
const testScriptLocation = join(__dirname, testFileName);

// Set all test cases files
const testInputFiles = "./input/*.txt"

//Glob to get all test cases files
const getTestInputs = (globPattern) => {
    return new Promise((res, rej) => {
        glob(globPattern, (err, files) => {
            if (err) rej(err);
            res(files);
            return;
        });
    })
}

//Test Runner
const runnerTest = async () => {
    const testInput = await getTestInputs(testInputFiles);
    testInput.map(testFile => {

        const testOutput = testFile.replaceAll("in", "out");

        formatOutputResult(testOutput);
       
        const readableStreamInput = fs.createReadStream(testFile);

        const readableStreamOutput = fs.createReadStream(testOutput);


        const child = spawn("node", [testScriptLocation], {
        }, (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log("stdout", stdout);
            console.log("stderr", stderr);
        })

        child.stdin.resume();

        readableStreamInput.on("open", () => {
            readableStreamInput.pipe(child.stdin);
        });

        
        readableStreamOutput.on("open", () => {
            readableStreamOutput.pipe(child.stdin);
        });
    });
}
function formatOutputResult(testOutput) {
    let logRows = fs.readFileSync(testOutput).toString().split('\n');
    if (logRows[0].length > 0) {
        logRows.unshift('\n');
        fs.writeFileSync(testOutput, logRows.toString().replace(',', ''));
    }
}
//Run test
runnerTest().then();




