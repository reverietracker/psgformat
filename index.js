function readPSG(buffer) {
    if (buffer.toString('latin1', 0, 4) != 'PSG\x1a') {
        throw new Error("File is not a valid PSG file");
    }

    const frames = [];
    let pos = 16;
    let eof = false;
    let waitFrames = 0;
    let regWrites = [];
    for (let i=0; i < 12; i++) {
        regWrites.push([i, 0]);
    }

    while ((!eof) || waitFrames) {
        if (waitFrames) {
        frames.push([]);
        waitFrames--;
        } else {
        // read all commands for frame
        while (true) {
            if (pos == buffer.length) {
            eof = true;
            break;
            }

            let cmd = buffer.readUInt8(pos++);
            if (cmd == 0xfd) {
            eof = true;
            break;
            } else if (cmd == 0xff) {
            break;
            } else if (cmd == 0xfe) {
            waitFrames = (buffer.readUInt8(pos++) * 4) - 1;
            break;
            } else {
            regWrites.push([cmd, buffer.readUInt8(pos++)]);
            }
        }
        frames.push(regWrites);
        regWrites = [];
        }
    }

    return frames;
}

module.exports = { readPSG };
