const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'ml.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ghaMLTracker',
      type: 'var',
    },
  },
};