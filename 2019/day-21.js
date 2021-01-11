const debug = false;
const part1 = true;
const part2 = true;

function getModesAndOpcode(n) {
  const paddedN = ('' + n).padStart(5, '0');
  return [
    paddedN.substr(0, 3).split('').reverse().map(Number),
    +paddedN.substr(3),
  ];
}

function intcode(input, puzzleInput) {
  const arr = [...puzzleInput];
  let i = 0;
  let relativeBase = 0;
  let [modes, opcode] = getModesAndOpcode(arr[i]);
  const output = [];
  while (opcode !== 99) {
    const paramIndices = modes.map((mode, j) => {
      const paramIndex = i + 1 + j;
      switch (mode) {
        case 0:
          return arr[paramIndex] || 0;
        case 1:
          return paramIndex;
        case 2:
          return relativeBase + (arr[paramIndex] || 0);
      }
    });
    switch (opcode) {
      case 1:
        arr[paramIndices[2]] =
          (arr[paramIndices[0]] || 0) + (arr[paramIndices[1]] || 0);
        i += 4;
        break;
      case 2:
        arr[paramIndices[2]] =
          (arr[paramIndices[0]] || 0) * (arr[paramIndices[1]] || 0);
        i += 4;
        break;
      case 3:
        arr[paramIndices[0]] = input.shift();
        i += 2;
        break;
      case 4:
        output.push(arr[paramIndices[0]] || 0);
        i += 2;
        break;
      case 5:
        i = arr[paramIndices[0]] || 0 ? arr[paramIndices[1]] || 0 : i + 3;
        break;
      case 6:
        i = !(arr[paramIndices[0]] || 0) ? arr[paramIndices[1]] || 0 : i + 3;
        break;
      case 7:
        arr[paramIndices[2]] = +(
          (arr[paramIndices[0]] || 0) < (arr[paramIndices[1]] || 0)
        );
        i += 4;
        break;
      case 8:
        arr[paramIndices[2]] = +(
          (arr[paramIndices[0]] || 0) === (arr[paramIndices[1]] || 0)
        );
        i += 4;
        break;
      case 9:
        relativeBase += arr[paramIndices[0]] || 0;
        i += 2;
        break;
      default:
        console.error('invalid opcode', opcode);
    }
    [modes, opcode] = getModesAndOpcode(arr[i]);
  }
  return output;
}

function solve1(puzzleInput) {
  const program = [
    // gap at C
    'NOT C J',
    'AND D J',
    // gap at A
    'NOT A T',
    'OR T J',
    'WALK',
    '',
  ].join('\n');
  const output = intcode(
    program.split('').map((c) => c.charCodeAt(0)),
    puzzleInput
  );
  debug && console.log(String.fromCharCode(...output));
  console.log(output[output.length - 1]);
}

function solve2(puzzleInput) {
  const program = [
    // gap at C
    'NOT C J',
    'AND D J',
    // also gaps at E and H
    'NOT E T',
    'NOT T T',
    'OR H T',
    'AND T J',
    // gaps at B and and E
    'NOT B T',
    'NOT T T',
    'OR E T',
    'NOT T T',
    'OR T J',
    // gap at A
    'NOT A T',
    'OR T J',
    'RUN',
    '',
  ].join('\n');

  const output = intcode(
    program.split('').map((c) => c.charCodeAt(0)),
    puzzleInput
  );
  debug && console.log(String.fromCharCode(...output));
  console.log(output[output.length - 1]);
}

const puzzleInput = `109,2050,21102,966,1,1,21101,13,0,0,1105,1,1378,21102,20,1,0,1105,1,1337,21102,27,1,0,1106,0,1279,1208,1,65,748,1005,748,73,1208,1,79,748,1005,748,110,1208,1,78,748,1005,748,132,1208,1,87,748,1005,748,169,1208,1,82,748,1005,748,239,21101,1041,0,1,21102,73,1,0,1106,0,1421,21101,78,0,1,21102,1041,1,2,21101,88,0,0,1106,0,1301,21101,68,0,1,21101,0,1041,2,21101,103,0,0,1105,1,1301,1102,1,1,750,1105,1,298,21102,82,1,1,21102,1,1041,2,21102,125,1,0,1105,1,1301,1101,2,0,750,1105,1,298,21101,79,0,1,21101,0,1041,2,21101,0,147,0,1105,1,1301,21102,1,84,1,21102,1041,1,2,21101,0,162,0,1106,0,1301,1102,3,1,750,1106,0,298,21102,65,1,1,21101,1041,0,2,21102,1,184,0,1105,1,1301,21101,76,0,1,21102,1041,1,2,21102,1,199,0,1106,0,1301,21101,75,0,1,21101,1041,0,2,21101,0,214,0,1105,1,1301,21101,221,0,0,1105,1,1337,21101,0,10,1,21101,1041,0,2,21101,236,0,0,1106,0,1301,1105,1,553,21101,0,85,1,21102,1041,1,2,21101,0,254,0,1105,1,1301,21102,78,1,1,21101,1041,0,2,21101,269,0,0,1105,1,1301,21101,0,276,0,1105,1,1337,21102,10,1,1,21102,1,1041,2,21102,291,1,0,1105,1,1301,1102,1,1,755,1105,1,553,21101,0,32,1,21101,1041,0,2,21102,1,313,0,1105,1,1301,21102,320,1,0,1106,0,1337,21102,1,327,0,1105,1,1279,2101,0,1,749,21102,65,1,2,21101,0,73,3,21102,346,1,0,1106,0,1889,1206,1,367,1007,749,69,748,1005,748,360,1102,1,1,756,1001,749,-64,751,1106,0,406,1008,749,74,748,1006,748,381,1102,1,-1,751,1105,1,406,1008,749,84,748,1006,748,395,1101,-2,0,751,1106,0,406,21102,1,1100,1,21101,406,0,0,1106,0,1421,21101,0,32,1,21102,1100,1,2,21101,421,0,0,1106,0,1301,21102,428,1,0,1105,1,1337,21102,435,1,0,1106,0,1279,1201,1,0,749,1008,749,74,748,1006,748,453,1101,0,-1,752,1105,1,478,1008,749,84,748,1006,748,467,1101,-2,0,752,1105,1,478,21102,1,1168,1,21102,478,1,0,1106,0,1421,21101,0,485,0,1105,1,1337,21101,10,0,1,21101,1168,0,2,21101,500,0,0,1106,0,1301,1007,920,15,748,1005,748,518,21102,1,1209,1,21101,518,0,0,1105,1,1421,1002,920,3,529,1001,529,921,529,1001,750,0,0,1001,529,1,537,101,0,751,0,1001,537,1,545,1002,752,1,0,1001,920,1,920,1105,1,13,1005,755,577,1006,756,570,21102,1,1100,1,21101,570,0,0,1105,1,1421,21102,987,1,1,1105,1,581,21101,0,1001,1,21101,0,588,0,1106,0,1378,1101,0,758,593,1002,0,1,753,1006,753,654,20102,1,753,1,21101,610,0,0,1105,1,667,21101,0,0,1,21102,621,1,0,1105,1,1463,1205,1,647,21101,0,1015,1,21102,635,1,0,1106,0,1378,21101,0,1,1,21102,646,1,0,1106,0,1463,99,1001,593,1,593,1106,0,592,1006,755,664,1102,0,1,755,1106,0,647,4,754,99,109,2,1101,726,0,757,22101,0,-1,1,21101,9,0,2,21102,697,1,3,21102,1,692,0,1105,1,1913,109,-2,2105,1,0,109,2,1001,757,0,706,1201,-1,0,0,1001,757,1,757,109,-2,2105,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,255,63,95,191,127,159,223,0,114,123,177,197,234,62,126,190,158,84,236,212,53,116,154,56,218,207,43,213,202,171,246,174,247,103,219,196,254,61,94,231,143,173,117,183,178,253,69,184,235,107,142,155,79,39,42,220,125,38,138,232,47,87,168,54,189,136,229,157,120,188,49,244,59,215,137,71,60,57,214,205,175,108,243,86,221,198,179,248,113,139,222,206,227,217,77,162,252,239,76,100,55,98,166,106,186,163,182,50,140,242,78,58,99,102,124,170,92,122,241,93,187,101,110,51,237,250,167,109,118,121,201,216,172,199,70,200,152,249,169,245,228,251,115,46,233,238,141,34,230,85,35,185,226,204,156,68,111,153,181,119,203,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,73,110,112,117,116,32,105,110,115,116,114,117,99,116,105,111,110,115,58,10,13,10,87,97,108,107,105,110,103,46,46,46,10,10,13,10,82,117,110,110,105,110,103,46,46,46,10,10,25,10,68,105,100,110,39,116,32,109,97,107,101,32,105,116,32,97,99,114,111,115,115,58,10,10,58,73,110,118,97,108,105,100,32,111,112,101,114,97,116,105,111,110,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,78,68,44,32,79,82,44,32,111,114,32,78,79,84,67,73,110,118,97,108,105,100,32,102,105,114,115,116,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,44,32,66,44,32,67,44,32,68,44,32,74,44,32,111,114,32,84,40,73,110,118,97,108,105,100,32,115,101,99,111,110,100,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,74,32,111,114,32,84,52,79,117,116,32,111,102,32,109,101,109,111,114,121,59,32,97,116,32,109,111,115,116,32,49,53,32,105,110,115,116,114,117,99,116,105,111,110,115,32,99,97,110,32,98,101,32,115,116,111,114,101,100,0,109,1,1005,1262,1270,3,1262,20101,0,1262,0,109,-1,2105,1,0,109,1,21101,1288,0,0,1106,0,1263,20101,0,1262,0,1101,0,0,1262,109,-1,2105,1,0,109,5,21102,1,1310,0,1105,1,1279,22102,1,1,-2,22208,-2,-4,-1,1205,-1,1332,22102,1,-3,1,21101,0,1332,0,1106,0,1421,109,-5,2105,1,0,109,2,21101,1346,0,0,1106,0,1263,21208,1,32,-1,1205,-1,1363,21208,1,9,-1,1205,-1,1363,1106,0,1373,21101,0,1370,0,1105,1,1279,1105,1,1339,109,-2,2106,0,0,109,5,1202,-4,1,1385,21002,0,1,-2,22101,1,-4,-4,21102,1,0,-3,22208,-3,-2,-1,1205,-1,1416,2201,-4,-3,1408,4,0,21201,-3,1,-3,1106,0,1396,109,-5,2105,1,0,109,2,104,10,21202,-1,1,1,21102,1436,1,0,1106,0,1378,104,10,99,109,-2,2105,1,0,109,3,20002,593,753,-1,22202,-1,-2,-1,201,-1,754,754,109,-3,2105,1,0,109,10,21101,5,0,-5,21102,1,1,-4,21101,0,0,-3,1206,-9,1555,21101,0,3,-6,21101,0,5,-7,22208,-7,-5,-8,1206,-8,1507,22208,-6,-4,-8,1206,-8,1507,104,64,1105,1,1529,1205,-6,1527,1201,-7,716,1515,21002,0,-11,-8,21201,-8,46,-8,204,-8,1106,0,1529,104,46,21201,-7,1,-7,21207,-7,22,-8,1205,-8,1488,104,10,21201,-6,-1,-6,21207,-6,0,-8,1206,-8,1484,104,10,21207,-4,1,-8,1206,-8,1569,21101,0,0,-9,1105,1,1689,21208,-5,21,-8,1206,-8,1583,21102,1,1,-9,1106,0,1689,1201,-5,716,1588,21002,0,1,-2,21208,-4,1,-1,22202,-2,-1,-1,1205,-2,1613,21201,-5,0,1,21101,1613,0,0,1105,1,1444,1206,-1,1634,22102,1,-5,1,21101,1627,0,0,1106,0,1694,1206,1,1634,21102,1,2,-3,22107,1,-4,-8,22201,-1,-8,-8,1206,-8,1649,21201,-5,1,-5,1206,-3,1663,21201,-3,-1,-3,21201,-4,1,-4,1105,1,1667,21201,-4,-1,-4,21208,-4,0,-1,1201,-5,716,1676,22002,0,-1,-1,1206,-1,1686,21102,1,1,-4,1105,1,1477,109,-10,2105,1,0,109,11,21102,1,0,-6,21102,0,1,-8,21102,0,1,-7,20208,-6,920,-9,1205,-9,1880,21202,-6,3,-9,1201,-9,921,1725,20101,0,0,-5,1001,1725,1,1732,21002,0,1,-4,21202,-4,1,1,21102,1,1,2,21101,0,9,3,21102,1,1754,0,1106,0,1889,1206,1,1772,2201,-10,-4,1767,1001,1767,716,1767,20101,0,0,-3,1106,0,1790,21208,-4,-1,-9,1206,-9,1786,21202,-8,1,-3,1106,0,1790,21202,-7,1,-3,1001,1732,1,1795,21001,0,0,-2,21208,-2,-1,-9,1206,-9,1812,22102,1,-8,-1,1105,1,1816,22102,1,-7,-1,21208,-5,1,-9,1205,-9,1837,21208,-5,2,-9,1205,-9,1844,21208,-3,0,-1,1105,1,1855,22202,-3,-1,-1,1105,1,1855,22201,-3,-1,-1,22107,0,-1,-1,1105,1,1855,21208,-2,-1,-9,1206,-9,1869,21201,-1,0,-8,1105,1,1873,21201,-1,0,-7,21201,-6,1,-6,1105,1,1708,21201,-8,0,-10,109,-11,2106,0,0,109,7,22207,-6,-5,-3,22207,-4,-6,-2,22201,-3,-2,-1,21208,-1,0,-6,109,-7,2106,0,0,0,109,5,1201,-2,0,1912,21207,-4,0,-1,1206,-1,1930,21101,0,0,-4,21202,-4,1,1,22101,0,-3,2,21101,0,1,3,21102,1,1949,0,1105,1,1954,109,-5,2105,1,0,109,6,21207,-4,1,-1,1206,-1,1977,22207,-5,-3,-1,1206,-1,1977,22101,0,-5,-5,1105,1,2045,21201,-5,0,1,21201,-4,-1,2,21202,-3,2,3,21101,1996,0,0,1106,0,1954,21202,1,1,-5,21102,1,1,-2,22207,-5,-3,-1,1206,-1,2015,21102,0,1,-2,22202,-3,-2,-3,22107,0,-4,-1,1206,-1,2037,22101,0,-2,1,21102,1,2037,0,105,1,1912,21202,-3,-1,-3,22201,-5,-3,-5,109,-6,2105,1,0`
  .split(',')
  .map(Number);

part1 && solve1(puzzleInput);
part2 && solve2(puzzleInput);
