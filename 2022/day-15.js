const fs = require('fs');

const input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd(),
  targetY = 2000000,
  maxCoord = 4000000;

function dist(x, y, x2, y2) {
  return Math.abs(x2 - x) + Math.abs(y2 - y);
}

function solve1(input) {
  const targetRow = {};
  for (const line of input.split('\n')) {
    const [x, y, xb, yb] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, xb, yb);
    if (yb === targetY) {
      targetRow[xb] = 0;
    }
    const dx = d - Math.abs(y - targetY);
    for (let x2 = x - dx; x2 <= x + dx; x2++) {
      if (targetRow[x2] !== 0) {
        targetRow[x2] = 1;
      }
    }
  }
  console.log(Object.values(targetRow).reduce((acc, n) => acc + n));
}
solve1(input);

function intersect(p1, p2, p3, p4) {
  // Line p1-p2 represented as a1x + b1y = c1
  const a1 = p2[1] - p1[1];
  const b1 = p1[0] - p2[0];
  const c1 = a1 * p1[0] + b1 * p1[1];

  // Line p3-p4 represented as a2x + b2y = c2
  const a2 = p4[1] - p3[1];
  const b2 = p3[0] - p4[0];
  const c2 = a2 * p3[0] + b2 * p3[1];

  const determinant = a1 * b2 - a2 * b1;

  const x = (b2 * c1 - b1 * c2) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;
  return [x, y].map(Math.round);
}

function solve2(input) {
  const sensors = [];
  const diamonds = [];
  for (const line of input.split('\n')) {
    const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, bx, by);
    sensors.push([x, y, d]);
    diamonds.push([
      [x + (d + 1), y],
      [x, y + (d + 1)],
      [x - (d + 1), y],
      [x, y - (d + 1)],
    ]);
  }

  outer: for (let i = 0; i < diamonds.length - 1; i++) {
    const d1 = diamonds[i];
    for (let j = i + 1; j < diamonds.length; j++) {
      const d2 = diamonds[j];
      for (const i2 of [0, 1, 2, 3]) {
        for (const j2 of [i2 + 1, i2 + 3]) {
          const [xi, yi] = intersect(
            d1[i2],
            d1[(i2 + 1) % 4],
            d2[j2 % 4],
            d2[(j2 + 1) % 4]
          );
          if (
            [xi, yi].every((x) => x >= 0 && x <= maxCoord) &&
            sensors.every(([x, y, d]) => dist(x, y, xi, yi) > d)
          ) {
            console.log(4000000 * xi + yi);
            break outer;
          }
        }
      }
    }
  }
}
solve2(input);
