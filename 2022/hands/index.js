const fs = require('fs');

const FILE = './2022/hands/inputs/second_hands_input.txt';

// var access = fs.createWriteStream(FILE.replace("input", "output"));
// process.stdout.write = process.stderr.write = access.write.bind(access);

const display = (i, status) => {
    console.log(`Case #${i}: ${status ? 'YES' : 'NO'}`);
}

const set = (slots, val) => {
    if(!slots[0].includes(val)) {
        slots[0].push(val);
        return slots;
    }
    if(!slots[1].includes(val)) {
        slots[1].push(val);
        return slots;
    }
    throw 'no slot available';
}

const run = () => {
    fs.readFile(FILE, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let splitted = data.split("\n");
        splitted.shift();

        i = 0;
        processing: while(splitted.length >= 2) {
            let slots = [[], []];

            i++;
            const [N, K] = splitted.shift().split(" ");
            const parts = splitted.shift().split(" ");

            if (parts.length > K * 2) {
                display(i,  false);
                continue processing;
            }

            for (let part of parts) {
                try {
                    slots = set(slots, part);
                } catch {
                    display(i, false);
                    continue processing;
                }
            }
            display(i, true);
        }
      });
      
}


run();