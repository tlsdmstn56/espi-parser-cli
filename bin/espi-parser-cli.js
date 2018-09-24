#!/usr/bin/env node

const path = require('path');
const espiParser = require('espi-parser');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const fs = require('fs');

const optionDefinitions = [
    { 
        name: 'output', 
        alias: 'o', 
        type: String, 
        defaultValue: process.cwd(),
        typeLabel: '{underline output directory}',
        description: "directory to save converted json file",
    },
    { 
        name: 'quiet', 
        alias: 'q', 
        type: Boolean, 
        defaultValue:false,
        description: "if set, it will not print all process of parsing"
    },
    { 
        name: 'beautify',
        type: Boolean, 
        defaultValue:false, 
        description: "if set, json output will be beautified"
    },
    { 
        name: 'help',
        type: Boolean, 
        defaultValue:false, 
        description: "print help"
    },
    { 
        name: 'input', 
        alias: 'i', 
        type: String, 
        multiple: true, 
        defaultOption: true
    }
]
const sections = [
    {
        header: 'espi-parser',
        content: 'cli interface for espi-parser nodejs module'
    },
    {
        header: 'Syntax',
        content: "espi-parser [options] {underline file} ..."
    },
    {
        header: 'Options',
        optionList: optionDefinitions,
        hide:'input'
    }
]
const options = commandLineArgs(optionDefinitions);
const {input, output, beautify, quiet} = options;
const usage = commandLineUsage(sections)
function print(str) {
    if (!quiet) {
        console.log(str)
    }
}

var error = 0
var success = 0

if(options.help) {
    console.log(usage)
    process.exit(0)
}

if(input === undefined) {
    console.error(`ERROR: no input files provided`)
    console.log(usage)
    process.exit(1)
}

for (src of input) {
    let data = 0;
    try {
        data = fs.readFileSync(src);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`ERROR: No such file or directory: ${src}`)
            error ++;
            continue;
        } else {
            throw err;
        }
    }
    let json = espiParser(data.toString());
    let jsonString = beautify? 
        JSON.stringify(json, null, 4):JSON.stringify(json);
    let filename = path.basename(src)
    fs.writeFileSync(`${output}/${filename}.json`, jsonString);
    print(`parsing ${filename} ...`)
    success++;
} 
print("")
print(`${success} files parsed in ${output}, ${error} files in error`)