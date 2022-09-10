const fs = require('fs');

// const FILE = './2022/b1/inputs/sample.txt';
const FILE = './2022/b1/inputs/second_friend_input.txt';

var access = fs.createWriteStream(FILE.replaceAll("input", "output"));
process.stdout.write = process.stderr.write = access.write.bind(access);

const display = (i, status, arr) => {
    console.log(`Case #${i}: ${status ? 'Possible' : 'Impossible'}`);
    if(arr) {
      for(let i = 0; i < arr.length; i++) {
        console.log(arr[i].join(''));
      }
    }
}

const hasTree = (arr) => arr.reduce((acc, e) => acc || e.reduce((acc, e) => e == '^' ? acc || 1 : acc || 0, 0), 0)

const run = () => {
    fs.readFile(FILE, 'utf8', (err, data) => {
        if (err) {
          console.trace(err);
          return;
        }
        let arr = data.split('\n');
        let nbExercices = arr.shift();
        for(let i = 1; i <= nbExercices; i++) {
          let [h, w] = arr.shift().split(' ').map(e => +e);
          let land = [];          
          for (let j = 0; j < h; j++) {
            land.push(arr.shift().split(''));
          }

          if (!hasTree(land)) {
            display(i, true, land);
            continue;
          }
          
          if (h == 1 || w == 1) {
            display(i, false);
            continue;
          }

          display(i, true, land.map(e => e.map(() => '^')));
        }
      });
      
}


run();