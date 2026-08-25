const path = require('path');

module.exports = {
  entry: './src/base-loanspq.js',
  output: {
    filename: 'pos.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ghaPOSTracker',
      type: 'var',
    },
  },
};