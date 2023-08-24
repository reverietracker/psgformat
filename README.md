# psgformat

A parser and writer for .psg AY sound chip stream files

## Installation

```
npm install psgformat
```

## Usage

### Reading

This package exports a function `readPSG` which accepts a buffer containing the binary data of the .psg file, and returns the data as an array of frames. Each frame is an array of register writes, with each register write being expressed as an array `[register, value]`.

```javascript
const fs = require("fs");
const { readPSG } = require('psgformat');

const buf = fs.readFileSync('myfile.psg'));
const psg = readPSG(buf);
```

### Writing

The package also exports a function `writePSG` which accepts a writable stream and an array of frames, and writes the data to the stream.

```javascript
const fs = require("fs");
const { writePSG } = require('psgformat');

const frames = [
    [ [0, 1], [1, 2], [2, 3] ],
    [ [0, 4], [1, 5], [2, 6] ],
    [ [0, 7], [1, 8], [2, 9] ],
];
const file = fs.createWriteStream('myfile.psg');
writePSG(file, frames);
file.end();
```
