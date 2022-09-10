const fs = require('fs');
const { join } = require('path');

// const FILE = './2022/round1/a1/inputs/samples.txt';
const FILE = './2022/round1/a1/inputs/consecutive_cuts_chapter_1_validation_input.txt';

var access = fs.createWriteStream(FILE.replace("input", "output"));
process.stdout.write = process.stderr.write = access.write.bind(access);

const display = (i, status) => {
    console.log(`Case #${i}: ${status ? 'YES' : 'NO'}`);
}

const check = (a, b) => a === b;

const check1 = (a, b) => {
    let start = [a[0], a[1]].join(' ');
    let ar = b.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g);
    return ar.includes(start);
}
const check2 = (a, b) => {
    let start = [a[0], a[1]].join(' ');
    let start2 = [a[a.length - 1], a[0]].join(' ');
    let ar = (b + ' ' + b[0]).match(/\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g);
    return ar.includes(start) || ar.includes(start2);
}

const run = () => {
    fs.readFile(FILE, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let splitted = data.split("\n");
        let nbTests = splitted.shift();
        
        for (let i = 0; i < nbTests; i++) {
            let [N, K] = splitted.shift().split(' ');
            let l1 = splitted.shift().split(' ');
            let l2 = splitted.shift();

            if (N % 2 == 0 && !check1(l1, l2)) {
                display(i + 1, false);
                continue;
            } else if (!check(l1.join(' '), l2) && (N % 2 == 1 && !check2(l1, l2))) {
                console.log(check2(l1, l2))
                display(i + 1, false);
                continue;
            }

            for(let j = 0; j < K ; j++) {
                if(check(l1.join(' '), l2)) break;
                let t = l1.splice(0, 2);
                l1 = [...l1, ...t];
            }
            display(i + 1, check(l1.join(' '), l2));
        }

      });
      
}


run();