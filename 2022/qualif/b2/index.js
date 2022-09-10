const fs = require('fs');

const FILE = './2022/b2/inputs/sample.txt';

var access = fs.createWriteStream(FILE.replaceAll("input", "output"));
process.stdout.write = process.stderr.write = access.write.bind(access);

const displayLand = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(''));
  }
}

const display = (i, status, arr) => {
    console.log(`Case #${i}: ${status ? 'Possible' : 'Impossible'}`);
    if(arr && status) {
      displayLand(arr);
    }
}

const fillLand = (land) => {
  for (let a = 0; a < land.length; a++) {
    for (let b = 0; b < land[a].length; b++) {
      if (land[a][b] == '.') {
        land[a][b] = '^';
      }
    }
  }
  return land;
} 

const countFriend = (x, y, land) => {
  let count = 0;
  if (land[x][y] != '^') {
    return land[x][y];
  }

  let couples = [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1 , y]
  ];

  for(let couple of couples) {
    try {
      if (land[couple[0]][couple[1]] == '^') {
        count++;
      }
    } catch {}
  }

  return count > 0 ? count : -1;
}

const getFriendsMatrice = (land) => {
  let matrice = [];
  for (let a = 0; a < land.length; a++) {
    matrice[a] = [];
    for (let b = 0; b < land[a].length; b++) {
      matrice[a][b] = countFriend(a, b, land);
    }
  } 
  return matrice;
}

const reduceTrees = (land) => {
  let matrice = getFriendsMatrice(land);
  for (let a = 0; a < land.length; a++) {
    for (let b = 0; b < land[a].length; b++) {
      land[a][b] = land[a][b] == '#' ? '#' : matrice[a][b] <= 1 ? '.' : "^";
    }
  }
  return land;
}

const haveAloneTrees = (land) => {
  for (let a = 0; a < land.length; a++) {
    for (let b = 0; b < land[a].length; b++) {
      if (land[a][b] == 1 || land[a][b] == 0) {
        return true;
      }
    }
  }
  return false;
}

const hasAnyTree = (arr) => arr.reduce((acc, e) => acc || e.reduce((acc, e) => e == '^' ? acc || 1 : acc || 0, 0), 0)

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

          land = fillLand(land);

          do {
            land = reduceTrees(land);
          } while(haveAloneTrees(getFriendsMatrice(land)));

          if (!hasAnyTree(land)) {
            display(i, true, land);
            continue;
          }
          
          if (h == 1 || w == 1) {
            display(i, false);
            continue;
          }

          display(i, true, land);
        }
      });
}

run();