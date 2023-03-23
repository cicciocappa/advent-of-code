const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd(),
const ranges = input.split('\n').map(line => line.split('-').map(i => parseInt(i, 10)));
const MAX = 4294967295;

ranges.sort((a, b) => a[0] - b[0]);

let allowedCount = 0;
let lastMax = -1;
let firstAllowed;

for (let i = 0; i < ranges.length; i++) {
  const c = Math.max(0, ranges[i][0] - lastMax - 1);
  allowedCount += c;
  if (firstAllowed === undefined && c) firstAllowed = lastMax + 1;
  lastMax = Math.max(lastMax, ranges[i][1]);
}
allowedCount += Math.max(0, MAX - lastMax);

console.log('Part 1', firstAllowed);
console.log('Part 2', allowedCount);
