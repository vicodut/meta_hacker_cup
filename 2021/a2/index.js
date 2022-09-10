const fs = require('fs');

// const FILE = './2021/a2/inputs/samples.txt';
const FILE = './2021/a2/inputs/weak_typing_chapter_2_input.txt';

// var access = fs.createWriteStream(FILE.replaceAll("input", "output"));
// process.stdout.write = process.stderr.write = access.write.bind(access);

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

const getSwitch = (str) => {
    let res = [];
    for(let j = 0; j < str.length; j++) {
        if(j == 0) {
            res.push(0);
        } else if (isBoth(str[j])) {
            str[j] = str[j-1];
        }
    }
    return str;
}

const getSubstring = (str) => {
    let res = new Map();
    let size = 2;

    while(size <= str.length) {
        for(let i = 0; i <= str.length - size; i++) {
            // res.push(str.slice(i, i + size).join(''));
            let a = str.slice(i, i + size).join('');
            if(!res.get(a)) {
                res.set(a, 1);
            } else {
                res.set(a, +res.get(a) + 1);
            }

        }
        size++;
    }
    return res;
}

const sum = (arr) => arr.length == 0 ? 0 : arr.reduce((acc, e) => acc + e);

const run = () => {
    fs.readFile(FILE, 'utf8', (err, data) => {
        if (err) {
          console.trace(err);
          return;
        }
        let arr = data.split('\n');
        let nbExercices = arr.shift();
        for(let i = 1; i < arr.length; i = i + 2) {
            let str = arr[i].split('');
            let subString = getSubstring(str);
            let subStringWithSwitch = Array.from(subString.keys())
                .map(e => (clean(getSwitch(e.split(''))).length - 1) * subString.get(e));
            display(Math.ceil(i / 2), sum(subStringWithSwitch));
        }
      });
      
}


run();