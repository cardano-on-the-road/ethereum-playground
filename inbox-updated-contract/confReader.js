const path = require('path');
const fs = require('fs');

const settingsPath = path.resolve(__dirname, 'settings.json');

module.exports = JSON.parse(fs.readFileSync(settingsPath, "utf8"));