# espi-parser-cli

cli interface for espi-parser nodejs module

## Getting Started
### Installation

```bash
npm install -g espi-parser-cli
```

## Usage

```bash
$ espi-parser [options] files ...
```

## Examples
```bash
# it will generate json file in the directory which run this command
$ espi-parser ../example/espi-example.file
```

```bash
# it will generate json file in ./output/ directory
$ espi-parser -o ./output/ ../example/espi-example.file
```

```bash
# it will generate beautified json file 
$ espi-parser --beautify -o ./output/ ../example/espi-example.file
```