# psgformat

A parser and writer for .psg AY sound chip stream files

## Installation

```
npm install psgformat
```

## Usage

This package exports a function `readPSG` which accepts a buffer containing the binary data of the .psg file, and returns the data as an array of frames. Each frame is an array of register writes, with each register write being expressed as an array `[register, value]`.

```javascript
const fs = require("fs");
const { readPSG } = require('psgformat');

const buf = fs.readFileSync('myfile.psg'));
const psg = readPSG(buf);
```
