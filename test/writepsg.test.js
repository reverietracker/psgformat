const streams = require('memory-streams')
const { writePSG } = require('..');

test("can write PSG files", () => {
    const writer = new streams.WritableStream();
    writePSG(writer, [
        [ [0, 0], [1, 11], [2, 22] ],
        [ ],
        [ [1, 0] ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ [2, 0] ],
    ])
    const buf = writer.toBuffer();
    const header = buf.toString('latin1', 0, 16);
    expect(header).toBe('PSG\x1a\0\0\0\0\0\0\0\0\0\0\0\0');
    const data = buf.subarray(16);
    expect(data).toStrictEqual(Buffer.from([0, 0, 1, 11, 2, 22, 0xff, 0xff, 1, 0, 0xfe, 1, 0xff, 2, 0, 0xff]));
});
