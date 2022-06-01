const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const kickPath = path.resolve(__dirname, 'contracts', 'Kickstarter.sol');
const source = fs.readFileSync(kickPath, 'utf8');
 
const input = {
  language: 'Solidity',
  sources: {
    'Kickstarter.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = solc.compile(JSON.stringify(input)).contracts;
console.log(output);

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   'Kickstarter.sol'
// ].Campaign;


