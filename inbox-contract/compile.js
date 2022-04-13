path = require('path') 
fs = require('fs');
solc = require ('solc')

const inBoxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inBoxPath, "utf8");

// To make the compile data available
module.exports = solc.compile(source, 1).contracts[':Inbox'];