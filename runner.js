const glob = require("glob");
const { spawn } = require("child_process");
const fs = require('fs');
const { join } = require("path");

const testFileName = "test.js"

const testScriptLocation = join(__dirname, testFileName);

// Glob to get all test cases files
const testCaseFiles = "./input/*.txt"

const getTestCases = (globPattern) => {
    return new Promise((res, rej) => {
        glob(globPattern, (err, files) => {
            if (err) rej(err);
            res(files);
            return;
        });
    })
}

const getResultsFileLocation = (testFileLoc) => {
    const testFileArr = testFileLoc.split("/");
    const testFileName = testFileArr[testFileArr.length - 1];
    const resultFileLoc = join(__dirname, "output", testFileName);
    return resultFileLoc;
}


const runTestCases = async () => {
    // set output dir
    const testCases = await getTestCases(testCaseFiles);
    testCases.map(testFile => {
        // const echoTestContent = spawnSync("echo", [`$(cat ${testFile})`])
        process.env["OUTPUT_PATH"] = getResultsFileLocation(testFile);
        const readableStream = fs.createReadStream(testFile);
        const child = spawn("node", [testScriptLocation], {
        }, (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log("stdout", stdout);
            console.log("stderr", stderr);
        })

        child.stdin.resume();

        readableStream.on("open", () => {
            readableStream.pipe(child.stdin);
        });

        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        child.stdout.on('error', function (data) {
            console.log(data.toString());
        });

        child.stderr.on('data', function (data) {
            console.log(data.toString());
        });
    });
}

runTestCases().then();


