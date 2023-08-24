const streams = require('memory-streams')
const { writePSG } = require('..');

test("can write PSG files", () => {
    const writer = new streams.WritableStream();
    const frames = [
        [ [0, 0], [1, 11], [2, 22] ],
        [ ],
        [ [1, 0] ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ [2, 0] ],
    ];
    for (let i = 0; i < 2000; i++) {
        frames.push([]);
    }
    frames.push([ [1, 99] ]);
    writePSG(writer, frames);
    const buf = writer.toBuffer();
    const header = buf.toString('latin1', 0, 16);
    expect(header).toBe('PSG\x1a\0\0\0\0\0\0\0\0\0\0\0\0');
    const data = buf.subarray(16);
    expect(data).toStrictEqual(
        Buffer.from([0, 0, 1, 11, 2, 22, 0xff, 0xff, 1, 0, 0xfe, 1, 0xff, 2, 0, 0xfe, 255, 0xfe, 245, 0xff, 1, 99, 0xff])
    );
});
