const fs = require('fs');

// const FILE = './2021/a1/inputs/test_case.txt';
const FILE = './2021/a1/inputs/weak_typing_chapter_1_input.txt';

var access = fs.createWriteStream(FILE.replaceAll("input", "output"));
process.stdout.write = process.stderr.write = access.write.bind(access);

const display = (i, status) => {
    console.log(`Case #${i}: ${status}`);
}

const hand = (a, b) => a.includes(b);

const isBoth = (a) => hand('F', a);

const clean = (arr) => {
    if (arr.length == 0) return [];
    let res = [...arr.shift()];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != res[res.length - 1]) {
            res.push(arr[i]);
        }
    }
    if(res[0] == 'F' && res.length > 1) {
        res[0] = res[1];
        return clean(res);
    }

    return res;
}

const run = () => {
    fs.readFile(FILE, 'utf8', (err, data) => {
        if (err) {
          console.trace(err);
          return;
        }
        let arr = data.split('\n');
        let nbExercices = arr.shift();
        let res = [];
        for(let i = 1; i < arr.length; i = i + 2) {
            let str = arr[i].split('');
            for(let j = 0; j < str.length; j++) {
                if(j == 0) {
                    res.push(0);
                } else if (isBoth(str[j])) {
                    str[j] = str[j-1];
                }
            }
            display(Math.ceil(i / 2), clean(str).length - 1);
        }
      });
      
}


run();