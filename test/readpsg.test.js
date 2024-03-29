const fs = require("fs");
const path = require("path");
const { readPSG } = require('..');

test("can read PSG files", () => {
    const buf = fs.readFileSync(path.join(__dirname, 'paraend.psg'));
    const frames = readPSG(buf);
    expect(frames.length).toBe(1969);
    expect(frames[0]).toStrictEqual([
        [ 0, 0 ],  [ 1, 0 ],
        [ 2, 0 ],  [ 3, 0 ],
        [ 4, 0 ],  [ 5, 0 ],
        [ 6, 0 ],  [ 7, 0 ],
        [ 8, 0 ],  [ 9, 0 ],
        [ 10, 0 ], [ 11, 0 ]
    ]);
    expect(frames[1]).toStrictEqual([
        [ 0, 248 ], [ 1, 1 ],
        [ 2, 223 ], [ 3, 1 ],
        [ 4, 253 ], [ 5, 3 ],
        [ 7, 40 ],  [ 8, 15 ],
        [ 9, 15 ],  [ 10, 15 ]
    ]);
});

test("can read PSG files with end markers", () => {
    // apparently the end marker is kind of optional, and the psg files
    // created by ay-emul don't have them. So hack this one so it does...
    const buf = fs.readFileSync(path.join(__dirname, 'paraend.psg'));
    buf[buf.length - 1] = 0xfd;
    const frames = readPSG(buf);
    expect(frames.length).toBe(1968);
    expect(frames[0]).toStrictEqual([
        [ 0, 0 ],  [ 1, 0 ],
        [ 2, 0 ],  [ 3, 0 ],
        [ 4, 0 ],  [ 5, 0 ],
        [ 6, 0 ],  [ 7, 0 ],
        [ 8, 0 ],  [ 9, 0 ],
        [ 10, 0 ], [ 11, 0 ]
    ]);
    expect(frames[1]).toStrictEqual([
        [ 0, 248 ], [ 1, 1 ],
        [ 2, 223 ], [ 3, 1 ],
        [ 4, 253 ], [ 5, 3 ],
        [ 7, 40 ],  [ 8, 15 ],
        [ 9, 15 ],  [ 10, 15 ]
    ]);
});

test("raises exception on invalid PSG files", () => {
    const buf = Buffer.from('Not a PSG file');
    expect(() => readPSG(buf)).toThrow("File is not a valid PSG file");
});
