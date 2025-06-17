const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'pos.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ghaMLTracker',
      type: 'var',
    },
  },
};